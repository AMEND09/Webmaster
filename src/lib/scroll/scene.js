// One scene = one pinned viewport whose scroll distance scrubs a timeline.
// The user scrubs: down plays forward, up rewinds. They set the pace.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONDITIONS = {
  reduced: '(prefers-reduced-motion: reduce)',
  portrait: '(prefers-reduced-motion: no-preference) and (orientation: portrait)',
  wide: '(prefers-reduced-motion: no-preference) and (orientation: landscape)',
};

// How much scrolling each beat gets. Portrait needs more because the scenes are
// taller and each beat covers less of the screen; reduced motion gets barely any.
const PIN = { reduced: '+=60%', portrait: '+=240%', wide: '+=200%' };

/**
 * Pin `root` and scrub a timeline built by `build(tl, ctx)`.
 * ctx: { q, mode, reduced } — q is a gsap selector scoped to the scene.
 * Returns a teardown function.
 */
export function scrubScene(root, build, { pin = PIN } = {}) {
  const mm = gsap.matchMedia();

  mm.add(CONDITIONS, (ctx) => {
    const { reduced, portrait } = ctx.conditions;
    const mode = reduced ? 'reduced' : portrait ? 'portrait' : 'wide';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: pin[mode],
        pin: true,
        // 0.6, not `true`. The catch-up is what makes it feel like weight
        // rather than a value bolted to the scrollbar.
        scrub: reduced ? true : 0.6,
        invalidateOnRefresh: true,
      },
    });

    build(tl, { q: gsap.utils.selector(root), mode, reduced });

    // Every scrubbed timeline needs a hold. Without it the final beat lands on
    // the exact frame the pin releases and reads as clipped.
    tl.to({}, { duration: reduced ? 0.2 : 0.6 });
  });

  return () => mm.revert();
}

/** Non-pinned reveal, for content the user has arrived at and should be able to use. */
export function revealOnce(root, build) {
  const mm = gsap.matchMedia();

  mm.add(CONDITIONS, (ctx) => {
    const { reduced } = ctx.conditions;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top 78%', once: true },
    });
    if (reduced) {
      // Nothing to animate — just make sure everything is at its resting state.
      return;
    }
    build(tl, { q: gsap.utils.selector(root) });
  });

  return () => mm.revert();
}

export { gsap, ScrollTrigger };
