import { createEl } from "../utils/utils.js";

export function createAddPic() {
  const app = document.querySelector("#app");
  const uploadCon = createEl("div", { className: "uploadCon" });
  const mainTitle = createEl("div", {
    className: "mainTitle",
    innerHTML: "Image Gallery",
  });
  const form = createEl("form", { className: "formUpload" });
  const inputName = createEl("input", {
    className: "inputName",
    name: "name",
    placeholder: "Artist Name",
  });
  const inputTitle = createEl("input", {
    className: "inputTitle",
    name: "title",
    placeholder: "Picture Title",
  });
  const pic = createEl("input", {
    className: "pic",
    type: "file",
    name: "file",
  });
  const sendBtn = createEl("button", { type: "submit", innerHTML: "Upload" });
  const boxCon = createEl("div", { className: "boxCon" });

  app.append(boxCon);
  form.append(inputName, inputTitle, pic, sendBtn);
  uploadCon.append(mainTitle, form);
  return uploadCon;
}
