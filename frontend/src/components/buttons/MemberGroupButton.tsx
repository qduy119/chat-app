export default function MemberGroupButton() {
    return (
        <div
            className="tooltip tooltip-left"
            data-tip="See group members"
        >
            <button
                type="button"
                className="uppercase text-white btn btn-success"
                onClick={() => {
                    (
                        document.getElementById(
                            "member-group-modal"
                        ) as HTMLFormElement
                    )?.showModal();
                }}
            >
                Members
            </button>
        </div>
    );
}
