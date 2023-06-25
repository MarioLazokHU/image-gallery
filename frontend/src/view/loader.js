import { createEl } from "../utils/utils.js";

export function loader() {
  const loader = createEl("span", { className: "loader" });
  const loaderCon = createEl("div", { className: "noLoaderCon" });
  loaderCon.append(loader);
  const app = document.querySelector("#app");
  app.append(loaderCon);
  window.addEventListener("load", () => {
    loaderCon.classList.remove("noLoaderCon");
    loaderCon.classList.add("loaderCon");
    setTimeout(() => {
      loaderCon.classList.add("noLoaderCon");
      loaderCon.classList.remove("loaderCon");
    }, 2000);
  });
}
