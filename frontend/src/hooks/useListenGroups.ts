import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { Group, useGroupContext } from "../context/GroupContext";
import toast from "react-hot-toast";

const useListenGroups = () => {
    const { socket } = useSocketContext();
    const { setGroups } = useGroupContext();

    useEffect(() => {
        function handleNewGroups(newGroup: Group) {
            setGroups((prev) => [...prev, newGroup]);
            toast.success(`Welcome to new group ${newGroup.group.name}`);
        }
        socket?.on("newGroup", handleNewGroups);

        return () => {
            socket?.off("newGroup", handleNewGroups);
        };
    }, [socket, setGroups]);
};

export default useListenGroups;
