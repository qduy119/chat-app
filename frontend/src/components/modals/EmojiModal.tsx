import { Emojis } from "../../utils/emojis";

export default function EmojiModal({
    onChooseEmoji,
}: {
    onChooseEmoji: (emoji: string) => void;
}) {
    return (
        <dialog id="emoji-modal" className="modal">
            <div className="modal-box bg-white">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="p-3">
                    <div className="grid grid-cols-12 gap-2">
                        {Emojis.map((emoji, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center"
                            >
                                <span
                                    className="cursor-pointer"
                                    onClick={() => onChooseEmoji(emoji)}
                                >
                                    {emoji}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
