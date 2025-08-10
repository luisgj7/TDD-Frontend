import { createRoot } from "react-dom/client";
import { Calculator } from "./calculator/Calculator";
import './index.css';

createRoot(
    document.getElementById("root")
).render(<Calculator />)
