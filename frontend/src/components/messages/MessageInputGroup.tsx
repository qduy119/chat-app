import { ChangeEvent, FormEvent, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";
import { LuSmilePlus } from "react-icons/lu";
import InputImage from "../images/InputImage";
import EmojiModal from "../modals/EmojiModal";
import useSendMessageInGroup from "../../hooks/useSendMessageInGroup";

const MessageInputGroup = () => {
    const [message, setMessage] = useState<string>("");
    const { loading, sendMessage } = useSendMessageInGroup();
    const [imagesFile, setImagesFile] = useState<File[]>([]);

    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
        const filesUpload = e.target.files;
        if (filesUpload) {
            for (const file of filesUpload) {
                setImagesFile((prev) => [...prev, file]);
            }
        }
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message && imagesFile.length <= 0) return;
        const payload = new FormData();
        payload.set("message", message);
        for (const file of imagesFile) {
            payload.append("images", file);
        }
        await sendMessage(payload);
        setMessage("");
        setImagesFile([]);
    };
    const handleDeleteImage = (index: number) => {
        const updatedFilesUpload = imagesFile.filter((_, i) => i !== index);
        setImagesFile(updatedFilesUpload);
    };
    const handleChooseEmoji = (emoji: string) => {
        const newMessage = message.concat(emoji);
        setMessage(newMessage);
    };

    return (
        <div className="p-2">
            <div className="overflow-x-auto flex gap-3 p-2 bg-gray-50 rounded-lg">
                {imagesFile.map((file, index) => (
                    <InputImage
                        key={index}
                        file={file}
                        index={index}
                        handleDeleteImage={handleDeleteImage}
                    />
                ))}
            </div>
            <form
                className="px-4 my-3"
                onSubmit={handleSubmit}
                method="POST"
                encType="multipart/form-data"
            >
                <div className="w-full relative">
                    <input
                        type="text"
                        className="border text-sm rounded-lg block w-full p-2 bg-gray-100 text-gray-500 border-gray-600"
                        placeholder="Send a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div
                        className="tooltip absolute inset-y-0 end-16 flex items-center"
                        data-tip="Choose images"
                    >
                        <label htmlFor="images">
                            <FaImage className="hover:opacity-80 cursor-pointer" />
                        </label>
                    </div>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={handleAddImage}
                        hidden
                    />
                    <div
                        className="tooltip absolute inset-y-0 end-9 flex items-center"
                        data-tip="Choose an emoji"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                (
                                    document.getElementById(
                                        "emoji-modal"
                                    ) as HTMLFormElement
                                )?.showModal();
                            }}
                        >
                            <LuSmilePlus className="hover:opacity-80" />
                        </button>
                    </div>
                    <div
                        className="tooltip absolute inset-y-0 end-3 flex items-center"
                        data-tip="Send a message"
                    >
                        <button type="submit" className="hover:opacity-80">
                            {loading ? (
                                <div className="loading loading-spinner"></div>
                            ) : (
                                <BsSend />
                            )}
                        </button>
                    </div>
                </div>
            </form>
            <EmojiModal onChooseEmoji={handleChooseEmoji} />
        </div>
    );
};
export default MessageInputGroup;
