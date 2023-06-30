import { createAddPic } from "./src/model/createAddPic.js";
import { addPicFormHandler } from "./src/view/addPicFormHandler.js";
import { createSwiper } from "./src/model/createSwiperEl.js";
import { fillSwiper } from "./src/view/fillSwiper.js";
import { loader } from "./src/view/loader.js";

const app = document.querySelector("#app");

function main() {
  app.append(createAddPic());
  addPicFormHandler();
  app.append(createSwiper());
  fillSwiper();
  loader();
}

main();
