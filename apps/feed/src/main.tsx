import { createRoot } from "react-dom/client";
import "./index.css";
import Catalog from "./presentation/Catalog";

const container = document.getElementById("root");

if (container !== null) {
  createRoot(container).render(<Catalog />);
}
