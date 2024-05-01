import Groups from "../groups/Groups";
import Conversations from "./Conversations";
import CreateGroupButton from "./CreateGroupButton";
import LogoutButton from "../buttons/LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col bg-gray-600">
            <div className="flex items-center gap-2">
                <CreateGroupButton />
                <SearchInput />
            </div>
            <div className="divider px-3 mb-2"></div>
            <Groups />
            <Conversations />
            <LogoutButton />
        </div>
    );
};
export default Sidebar;
