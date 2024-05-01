import { ChangeEvent, FormEvent, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { User as Member } from "../../context/AuthContext";
import SelectMemberModal from "./SelectMemberModal";
import GroupThumbnail from "../images/GroupThumbnail";
import useCreateGroup from "../../hooks/useCreateGroup";
import useGetConversations from "../../hooks/useGetConversations";

export default function GroupModal() {
    const { loading, createGroup } = useCreateGroup();
    const [members, setMembers] = useState<Member[]>([]);
    const [thumbnail, setThumbnail] = useState<File>();
    const [groupName, setGroupName] = useState<string>("");
    const { conversations: users } = useGetConversations();

    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
        const fileUpload = e.target.files?.[0];
        if (fileUpload) {
            setThumbnail(fileUpload);
        }
    };

    function handleSelectMembers(member: Member, flag?: boolean) {
        if (!flag) {
            setMembers((prev) => [...prev, member]);
        } else {
            setMembers((prev) =>
                prev.filter((user) => user._id !== member._id)
            );
        }
    }

    async function handleSumbit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (members.length < 1 || !groupName) return;
        const payload = new FormData();
        if (thumbnail) {
            payload.set("thumbnail", thumbnail);
        }
        const participants = members.map((member) => member._id);
        for (const participant of participants) {
            payload.append("participants", participant);
        }
        payload.set("name", groupName);
        await createGroup(payload);
        setMembers([]);
        setGroupName("");
    }

    return (
        <dialog id="create-group-modal" className="modal">
            <div className="modal-box bg-white">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="p-3">
                    <form
                        action="post"
                        onSubmit={handleSumbit}
                        encType="multipart/form-data"
                    >
                        <label className="input input-bordered flex items-center gap-2 bg-white mb-3">
                            Group name
                            <input
                                type="text"
                                className="grow"
                                placeholder="Your group name ..."
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs mb-3 cursor-pointer">
                            <div
                                className="tooltip flex items-center"
                                data-tip="Choose a thumbnail"
                            >
                                <FaImage className="hover:opacity-80 cursor-pointer mr-2" />
                                Select a thumbnail
                            </div>
                            <input
                                type="file"
                                name="thumbnail"
                                className="file-input file-input-bordered w-full max-w-xs bg-white"
                                onChange={handleAddImage}
                                hidden
                                accept="image/jpeg, image/jpg, image/png"
                            />
                        </label>
                        {thumbnail ? (
                            <div className="mb-3 border border-1 flex justify-center rounded-lg p-2">
                                <GroupThumbnail file={thumbnail} />
                            </div>
                        ) : null}
                        <div
                            role="button"
                            className="btn btn-neutral text-white mb-2"
                            onClick={() => {
                                (
                                    document.getElementById(
                                        "select-member-modal"
                                    ) as HTMLFormElement
                                )?.showModal();
                            }}
                        >
                            Select members
                        </div>
                        <p>{members.length} members</p>
                        <div className="flex justify-end">
                            {loading ? (
                                <div className="loading loading-spinner"></div>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btn-outline btn-success uppercase"
                                >
                                    Create
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            <SelectMemberModal
                users={users}
                onSelectMember={handleSelectMembers}
                modalName="select-member-modal"
            />
        </dialog>
    );
}
