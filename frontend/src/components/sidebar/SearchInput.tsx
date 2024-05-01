import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import { useConversationContext } from "../../context/ConversationContext";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversationContext();
    const { conversations } = useGetConversations();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;

        const conversation = conversations.find((conversation) =>
            conversation.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else toast.error("No user found!");
    };
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search ..."
                className="input input-bordered rounded-full bg-gray-100 text-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white hover:bg-sky-400"
            >
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </form>
    );
};
export default SearchInput;
