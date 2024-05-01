import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Layout from "./layouts/Layout";
import ProtectRoute from "./layouts/Protect";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ProtectRoute />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                ],
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
