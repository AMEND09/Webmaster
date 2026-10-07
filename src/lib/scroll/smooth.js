// Lenis (inertial scroll) wired into GSAP's ticker, with ScrollTrigger reading the
// smoothed position. Without this handshake pinned scenes judder, because
// ScrollTrigger samples a scroll value Lenis is still interpolating towards.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let users = 0;

function tick(time) {
  lenis.raf(time * 1000); // gsap ticker is in seconds, lenis wants ms
}

/** Start smooth scroll (ref-counted). Returns the Lenis instance, or null when it is skipped. */
export function startSmoothScroll() {
  users += 1;
  if (lenis) return lenis;
  // Reduced motion gets the browser's own scrolling — inertia is the thing being opted out of.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopSmoothScroll() {
  users = Math.max(0, users - 1);
  if (users > 0 || !lenis) return;
  gsap.ticker.remove(tick);
  gsap.ticker.lagSmoothing(500, 33);
  lenis.destroy();
  lenis = null;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export { gsap, ScrollTrigger };
