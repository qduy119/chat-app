import { useMemo, useState } from "react";
import useAddMember from "../../hooks/useAddMember";
import { User as Member, useAuthContext } from "../../context/AuthContext";
import { useGroupContext } from "../../context/GroupContext";
import useGetConversations from "../../hooks/useGetConversations";
import SelectMemberModal from "./SelectMemberModal";

export default function MemberGroupModal() {
    const { selectedGroup } = useGroupContext();
    const { authUser } = useAuthContext();
    const { conversations } = useGetConversations();
    const [members, setMembers] = useState<Member[]>([]);
    const { addMember } = useAddMember();
    const users = useMemo(() => {
        return conversations?.reduce((res: Member[], user: Member) => {
            if (
                !selectedGroup?.participants.find(
                    (participant) => participant._id === user._id
                )
            ) {
                res.push(user);
            }
            return res;
        }, []);
    }, [conversations, selectedGroup?.participants]);

    function handleSelectMembers(member: Member, flag?: boolean) {
        if (!flag) {
            setMembers((prev) => [...prev, member]);
        } else {
            setMembers((prev) =>
                prev.filter((user) => user._id !== member._id)
            );
        }
    }

    async function handleSumbit() {
        const payload = members.map((member) => member._id);
        await addMember(payload);
        setMembers([]);
    }

    return (
        <dialog id="member-group-modal" className="modal">
            <div className="modal-box bg-white">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="p-3">
                    {selectedGroup?.participants.map(
                        (participant: Member, index) => (
                            <div
                                key={index}
                                className="flex gap-2 items-center rounded p-3 cursor-pointer hover:bg-slate-200 transition-all"
                            >
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            src={participant.avatar}
                                            alt="participant avatar"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1">
                                    <div className="flex gap-3 justify-between">
                                        <p className="font-bold text-gray-500">
                                            {participant.fullName}
                                        </p>
                                    </div>
                                </div>
                                {authUser?._id === participant._id && (
                                    <div className="badge badge-error text-white">
                                        You
                                    </div>
                                )}
                            </div>
                        )
                    )}
                    {members.length > 0 && (
                        <div className="flex mt-4 items-center justify-between">
                            <p>{members.length} members added</p>
                            <button
                                className="btn btn-success uppercase text-white"
                                onClick={handleSumbit}
                            >
                                Add to group
                            </button>
                        </div>
                    )}
                </div>
                <div
                    className={`modal-action ${
                        authUser?._id === selectedGroup?.group.creator
                            ? "justify-between"
                            : ""
                    }`}
                >
                    {authUser?._id === selectedGroup?.group.creator ? (
                        <button
                            type="button"
                            className="uppercase text-white btn btn-success"
                            onClick={() => {
                                (
                                    document.getElementById(
                                        "add-member-modal"
                                    ) as HTMLFormElement
                                )?.showModal();
                            }}
                        >
                            Add new members
                        </button>
                    ) : null}
                    <form method="dialog">
                        <button className="btn btn-neutral text-white">
                            Close
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            <SelectMemberModal
                users={users}
                onSelectMember={handleSelectMembers}
                modalName="add-member-modal"
            />
        </dialog>
    );
}
