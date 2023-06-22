import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export function swipeSet() {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}
