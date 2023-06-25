
import { createEl } from "../utils/utils.js";
import { fillSwiper } from "../view/fillSwiper.js";

export async function deleteItem() {
  const delBtns = document.querySelectorAll(".delBtn");
  const boxCon = document.querySelector(".boxCon");

  delBtns.forEach((delBtn) => {
    delBtn.removeEventListener("click", handleDeleteClick);
    delBtn.addEventListener("click", handleDeleteClick);
  });

  async function handleDeleteClick() {
    const currentDelBtn = this;

    const checkBox = createEl("div", { className: "checkBox" });
    const ask = createEl("p", {
      innerHTML: `Delete Id: ${currentDelBtn.getAttribute("name")} item?`,
    });
    const btnCon = createEl("div", { className: "btnCon" });
    const yesBtn = createEl("button", {
      className: "yesBtn",
      innerHTML: "Yes",
      name: "Yes",
    });
    const noBtn = createEl("button", {
      className: "yesBtn",
      innerHTML: "No",
      name: "No",
    });
    btnCon.append(yesBtn, noBtn);
    checkBox.append(ask, btnCon);
    boxCon.append(checkBox);

    noBtn.addEventListener("click", () => {
      checkBox.classList.remove("checkBox");
      checkBox.classList.add("hideCheckBox");
      setTimeout(() => {
        boxCon.innerHTML = "";
      }, 900);
    });

    yesBtn.addEventListener("click", async () => {
      boxCon.innerHTML = "";
      const loaderCon = document.querySelector(".noLoaderCon");

      const res = await fetch(
        `/delete/${currentDelBtn.getAttribute("name")}`,
        { method: "DELETE" }
      );

      if (res.status === 200) {
        const checkBox = await createEl("div", { className: "checkBox" });
        const ask = await createEl("p", {
          innerHTML: `Successful deleted Id: ${currentDelBtn.getAttribute(
            "name"
          )} item.`,
        });
        checkBox.append(ask);
        boxCon.append(checkBox);
        checkBox.classList.add("checkBox");
        setTimeout(() => {
          checkBox.classList.remove("checkBox");
          checkBox.classList.add("hideCheckBox");
        }, 2000);

        setTimeout(() => {
          boxCon.innerHTML = "";
        }, 2500);

        loaderCon.classList.remove("noLoaderCon");
        loaderCon.classList.add("loaderCon");
        fillSwiper();
        setTimeout(() => {
          loaderCon.classList.add("noLoaderCon");
          loaderCon.classList.remove("loaderCon");
        }, 1000);
      }
    });
  }
}
