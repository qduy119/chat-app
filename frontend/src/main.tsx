import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import { ConversationContextProvider } from "./context/ConversationContext";
import { GroupContextProvider } from "./context/GroupContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <SocketContextProvider>
                <ConversationContextProvider>
                    <GroupContextProvider>
                        <App />
                    </GroupContextProvider>
                </ConversationContextProvider>
            </SocketContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
