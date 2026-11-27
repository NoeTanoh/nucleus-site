// Ashima Arts / Stefan Gustavson 3D simplex noise (MIT).
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

// Brand crystal: faceted navy-to-blue glass with orange highlights. Flat facets come from screen-space derivatives,
// a steel-blue rim from the fresnel term and champagne-gold glints from one key light.
export const coreVertex = /* glsl */ `
uniform float uTime;
varying vec3 vView;
varying vec3 vWorld;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = mv.xyz;
  vWorld = position;
  gl_Position = projectionMatrix * mv;
}
`;

export const coreFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uObsidian;
uniform vec3 uSteel;
uniform vec3 uGold;
uniform vec3 uIvory;
varying vec3 vView;
varying vec3 vWorld;
${noise}
void main(){
  vec3 n = normalize(cross(dFdx(vView), dFdy(vView)));
  vec3 v = normalize(-vView);
  float ndv = max(dot(n, v), 0.0);
  float fres = pow(1.0 - ndv, 2.6);
  vec3 key = normalize(vec3(-0.45, 0.75, 0.55));
  vec3 fill = normalize(vec3(0.7, -0.3, 0.4));
  float spec = pow(max(dot(reflect(-key, n), v), 0.0), 60.0);
  float spec2 = pow(max(dot(reflect(-fill, n), v), 0.0), 24.0);
  // faint mineral banding inside the glass
  float band = snoise(vWorld * 1.3 + vec3(0.0, uTime * 0.03, 0.0));
  // navy at the base, brand blue towards the top, like the logo gradient
  vec3 col = mix(uObsidian, uSteel, smoothstep(-1.2, 1.4, vWorld.y) * 0.6) * (1.0 + 0.25 * band);
  col += mix(uSteel, uIvory, 0.35) * fres * 0.9;
  col += uGold * spec * 1.25;
  col += uIvory * spec2 * 0.12;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export const glowVertex = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

export const glowFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uStrength;
varying vec2 vUv;
void main(){
  float d = distance(vUv, vec2(0.5));
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColor, pow(a, 2.4) * uStrength);
  #include <colorspace_fragment>
}
`;

export const pointsVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSeed;
varying float vAlpha;
void main(){
  vec3 p = position;
  float a = uTime * (0.02 + aSeed * 0.04);
  float c = cos(a), s = sin(a);
  p.xz = mat2(c, -s, s, c) * p.xz;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed * 1.8) + aSeed * 40.0);
  vAlpha = tw;
  gl_PointSize = (1.2 + aSeed * 2.6) * uPixelRatio * (9.0 / -mv.z);
}
`;

export const pointsFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, smoothstep(0.5, 0.1, d) * vAlpha * 0.45);
  #include <colorspace_fragment>
}
`;
