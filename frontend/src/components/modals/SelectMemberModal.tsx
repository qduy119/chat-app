import { ChangeEvent } from "react";
import { User as Member } from "../../context/AuthContext";

export default function SelectMemberModal({
    onSelectMember,
    users,
    modalName,
}: {
    users: Member[];
    onSelectMember: (member: Member, flag?: boolean) => void;
    modalName: string;
}) {
    function handleSelectMemebers(
        e: ChangeEvent<HTMLInputElement>,
        user: Member
    ) {
        if (e.target.checked) {
            onSelectMember(user);
        } else {
            onSelectMember(user, true);
        }
    }

    return (
        <dialog id={modalName} className="modal">
            <div className="modal-box bg-white">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="p-3">
                    {users.map((user, index) => (
                        <label key={index} htmlFor={`select-member-${index}`}>
                            <div
                                key={index}
                                className="flex gap-2 items-center rounded p-3 cursor-pointer hover:bg-slate-200 transition-all"
                            >
                                <input
                                    type="checkbox"
                                    name="select-member"
                                    id={`select-member-${index}`}
                                    className="checkbox"
                                    onChange={(e) =>
                                        handleSelectMemebers(e, user)
                                    }
                                />
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            src={user.avatar}
                                            alt="user avatar"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1">
                                    <div className="flex gap-3 justify-between">
                                        <p className="font-bold text-gray-500">
                                            {user.fullName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-neutral text-white">
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
