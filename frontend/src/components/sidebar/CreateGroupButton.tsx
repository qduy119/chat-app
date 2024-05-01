import GroupModal from "../modals/GroupModal";

export default function CreateGroupButton() {
    return (
        <div>
            <button
                type="button"
                className="btn btn-neutral text-white uppercase"
                onClick={() => {
                    (
                        document.getElementById(
                            "create-group-modal"
                        ) as HTMLFormElement
                    )?.showModal();
                }}
            >
                Create +
            </button>
            <GroupModal />
        </div>
    );
}
