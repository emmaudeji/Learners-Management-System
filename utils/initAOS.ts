// lib/initAOS.ts
import AOS, { AosOptions } from "aos";
import "aos/dist/aos.css";

export const initAOS = (options: Partial<AosOptions> = {}): void => {
  if (typeof window !== "undefined") {
    AOS.init({
        offset: 120,
        duration: 600,
        easing: 'ease-in-sine',
        // mirror: true,      

        // delay: 100, 
      ...options,          // Override with custom options
    });
  }
};


// 1. Fade Effects
// data-aos="fade": Fades the element in or out.
// data-aos="fade-up": Fades the element in while moving it upward.
// data-aos="fade-down": Fades the element in while moving it downward.
// data-aos="fade-left": Fades the element in while moving it to the left.
// data-aos="fade-right": Fades the element in while moving it to the right.
// data-aos="fade-up-left": Fades the element in while moving it diagonally up and left.
// data-aos="fade-up-right": Fades the element in while moving it diagonally up and right.
// data-aos="fade-down-left": Fades the element in while moving it diagonally down and left.
// data-aos="fade-down-right": Fades the element in while moving it diagonally down and right.
// 2. Slide Effects
// data-aos="slide-up": Slides the element up into view.
// data-aos="slide-down": Slides the element down into view.
// data-aos="slide-left": Slides the element left into view.
// data-aos="slide-right": Slides the element right into view.
// 3. Zoom Effects
// data-aos="zoom-in": Zooms the element in from smaller to normal size.
// data-aos="zoom-in-up": Zooms in while moving upward.
// data-aos="zoom-in-down": Zooms in while moving downward.
// data-aos="zoom-in-left": Zooms in while moving left.
// data-aos="zoom-in-right": Zooms in while moving right.
// data-aos="zoom-out": Zooms the element out from normal to smaller size.
// data-aos="zoom-out-up": Zooms out while moving upward.
// data-aos="zoom-out-down": Zooms out while moving downward.
// data-aos="zoom-out-left": Zooms out while moving left.
// data-aos="zoom-out-right": Zooms out while moving right.
// 4. Flip Effects
// data-aos="flip-left": Flips the element horizontally to the left.
// data-aos="flip-right": Flips the element horizontally to the right.
// data-aos="flip-up": Flips the element vertically upward.
// data-aos="flip-down": Flips the element vertically downward.
// 5. Additional Animation Types
// data-aos="bounce": Creates a bouncing effect.
// data-aos="flash": Flashes the element (blinks it in and out).
// data-aos="pulse": Pulses the element (scales in and out repeatedly).
// data-aos="rubber-band": Stretches the element like a rubber band.
// data-aos="shake": Shakes the element horizontally.
// data-aos="swing": Creates a swinging motion.
// data-aos="wobble": Makes the element wobble.
// data-aos="jello": Gives the element a jello-like wiggle effect.
// 6. Customization Attributes
// You can modify any animation with these attributes for fine-tuning:

// Attribute	Description	Example Value
// data-aos-offset	Offset (in pixels) from the original trigger point.	120
// data-aos-delay	Delay (in milliseconds) before the animation starts.	200
// data-aos-duration	Duration (in milliseconds) of the animation.	600
// data-aos-easing	Easing function for the animation.	ease-in-out
// data-aos-anchor	Links the animation to a specific anchor element instead of the default scroll trigger.	#my-anchor
// data-aos-anchor-placement	Specifies where the animation trigger occurs relative to the anchor element. Options: top-bottom, center-bottom, etc.	top-center
// data-aos-once	Runs the animation only once (true/false). Default is false (runs on every scroll).	true
