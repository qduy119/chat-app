import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Layout() {
    return (
        <div
            className="p-4 h-screen flex items-center justify-center bg-white"
        >
            <Outlet />
            <Toaster />
        </div>
    );
}
