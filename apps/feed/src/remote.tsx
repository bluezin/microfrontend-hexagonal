import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Catalog from "./presentation/Catalog";
import "./index.css";

export function mount(container: HTMLElement) {
  const root = createRoot(container);
  root.render(createElement(Catalog));

  return root;
}
