import { createRoot } from "react-dom/client";
import App from "./src/index.jsx";

const container = document.getElementById("container");
const root = createRoot(container);

root.render(<App />);
