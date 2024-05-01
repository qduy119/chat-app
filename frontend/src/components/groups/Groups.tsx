import { Group as IGroup, useGroupContext } from "../../context/GroupContext";
import useGetGroups from "../../hooks/useGetGroups";
import useListenGroups from "../../hooks/useListenGroups";
import { getRandomEmoji } from "../../utils/emojis";
import Group from "./Group";

export default function Groups() {
    useListenGroups();
    const { loading } = useGetGroups();
    const { groups } = useGroupContext();

    return (
        <div className="flex flex-col overflow-auto min-h-[250px] pb-2 border-b-[1px] border-b-gray-500">
            <p className="uppercase text-gray-200 py-2">Group messages</p>
            {groups.map((group: IGroup, idx) => (
                <Group key={idx} group={group} emoji={getRandomEmoji()} />
            ))}

            {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
            ) : null}
        </div>
    );
}
