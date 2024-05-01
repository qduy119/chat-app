import { useConversationContext } from "../../context/ConversationContext";
import { Group as IGroup, useGroupContext } from "../../context/GroupContext";
import useLazyGetMessagesInGroup from "../../hooks/useLazyGetMessagesInGroup";

export default function Group({
    group,
    emoji,
}: {
    group: IGroup;
    emoji: string;
}) {
    const { selectedGroup, setSelectedGroup } = useGroupContext();
    const { setSelectedConversation } = useConversationContext();
    const { getMessages } = useLazyGetMessagesInGroup();
    const isSelected = selectedGroup?._id === group._id;

    async function handleSelect() {
        setSelectedConversation(null);
        setSelectedGroup(group);
        await getMessages(group?._id);
    }

    return (
        <div
            className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 cursor-pointer
				${isSelected ? "bg-sky-400" : ""}
			`}
            onClick={handleSelect}
        >
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={group.group.thumbnail} alt="Group name" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">
                        {group.group.name}
                    </p>
                    <span className="text-xl">{emoji}</span>
                </div>
            </div>
        </div>
    );
}
