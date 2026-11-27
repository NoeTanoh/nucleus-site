import type { NextConfig } from "next";

/**
 * Two builds from one codebase:
 * - default: the full Node server (proxy for /fr|/en, /api rewrite to Django, security headers);
 * - STATIC_EXPORT=1: a static preview for GitHub Pages, served under PAGES_BASE_PATH.
 *   The contact form cannot reach Django there.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.PAGES_BASE_PATH || undefined;

const serverConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The browser only talks to this origin; /api/* is forwarded to the Django service.
  async rewrites() {
    const backend = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";
    return [{ source: "/api/:path*", destination: `${backend}/api/:path*/` }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

const exportConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
};

export default staticExport ? exportConfig : serverConfig;
