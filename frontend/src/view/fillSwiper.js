import { getImage, createEl } from "../utils/utils.js";
import { deleteItem } from "../controller/deleteItem.js";

export async function fillSwiper() {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = "";

  const reqA = await fetch("http://localhost:9000/authors/");
  const resA = await reqA.json();

  for (const result of resA) {
    const reqB = await getImage(`http://localhost:9000/pictures/${result.id}`);
    const slide = createEl("div", {
      className: "swiper-slide",
    });
    const slideDataCon = createEl("div", { className: "slideDataCon" });
    const leftCon = createEl("div", { className: "leftCon" });
    const infoCon = createEl("div", { className: "infoCon" });
    const pTitle = createEl("p", {
      className: "pTitle",
      innerHTML: result.data.title,
    });
    const pName = createEl("p", { innerHTML: `By: <br> ${result.data.name}` });
    const date = result.date.split(":");
    const pDate = createEl("p", {
      innerHTML: `Uploaded: <br> ${date[1]}:${date[2]}`,
    });
    const pId = createEl("p", `No: <br> ${result.id}`);
    const url = reqB.split(":");
    const pUrl = createEl("p", {
      innerHTML: `Url: <br> ${url[1] + url[2] + url[3]}`,
    });

    const img = createEl("img", { src: reqB });
    const delBtn = createEl("button", {
      className: "delBtn",
      name: result.id,
      innerHTML: "Delete",
    });
    infoCon.append(pTitle, pName, pDate, pId, pUrl);
    leftCon.append(infoCon, delBtn);

    slideDataCon.append(img, leftCon);
    slide.append(slideDataCon);
    swiperWrapper.prepend(slide);
  }

  await deleteItem();

}
