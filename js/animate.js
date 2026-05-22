// Text Animation
function animateText() {
  gsap.registerPlugin(SplitText);

  // Text animation
  let split = SplitText.create(".total-expenses,.my-balance", {
    type: "chars",
  });

  gsap.from(split.chars, {
    y: -20,
    autoAlpha: 0,
    stagger: 0.1,
    duration: 0.2,
  });

}



