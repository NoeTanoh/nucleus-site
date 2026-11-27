export const INTRO_KEY = "nucleus-intro";

/**
 * Runs before first paint (inlined in the layout): turns the intro off for
 * return visits in the same session and for reduced motion, so it never flashes.
 */
export const introGate = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")}catch(e){}try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="off"}catch(e){document.documentElement.dataset.intro="off"}`;
