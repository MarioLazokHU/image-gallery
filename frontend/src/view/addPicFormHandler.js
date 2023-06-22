import Swiper from "swiper";
import { fillSwiper } from "./fillSwiper.js";
export function addPicFormHandler() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    console.log([...formData.entries()]);

    const reqA = await fetch("http://localhost:9000/authors/", {
      method: "POST",
      body: formData,
    });

    if (reqA.status === 200) {
      form.reset();
      const loaderCon = document.querySelector(".noLoaderCon");
      loaderCon.classList.remove("noLoaderCon");
      loaderCon.classList.add("loaderCon");
      fillSwiper();
      const swiper = new Swiper(".swiper", {
        direction: "horizontal",
        loop: true,
      });
      swiper.update();
      setTimeout(() => {
        loaderCon.classList.add("noLoaderCon");
        loaderCon.classList.remove("loaderCon");
      }, 1000);
    }
  });
}