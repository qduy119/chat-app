import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectRoute() {
    const { authUser } = useAuthContext();

    return authUser ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
