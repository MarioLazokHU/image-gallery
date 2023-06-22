import { createEl } from "../utils/utils";

export function createSwiper() {
  const swiperContainer = createEl("div", {
    className: "swiper",
  });

  const swiperWrapper = createEl("div", {
    className: "swiper-wrapper",
  });
  swiperContainer.append(swiperWrapper);

  const swiperWrapperCon = createEl("div", { className: "swiperWrapperCon" });
  swiperWrapperCon.append(swiperContainer);
  return swiperWrapperCon;
}
