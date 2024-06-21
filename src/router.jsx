import { Box } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NumberMemory from "./pages/NumberMemory";
import SequenceMemory from "./pages/SequenceMemory";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/number",
        element: <NumberMemory />
    },
    {
        path: "/sequence",
        element: <SequenceMemory />
    }
])


export default router