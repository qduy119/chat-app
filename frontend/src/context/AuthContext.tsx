import {
    Dispatch,
    createContext,
    useContext,
    useState,
    ReactNode,
    SetStateAction,
} from "react";

export interface User {
    _id: string;
    fullName: string;
    username: string;
    gender: string;
    avatar: string;
}

interface IAuthContextType {
    authUser: User | null;
    setAuthUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

export const useAuthContext = (): IAuthContextType => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("chat-user") as string) || null
    );

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
