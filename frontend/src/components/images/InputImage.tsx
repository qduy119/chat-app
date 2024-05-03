import { TiDelete } from "react-icons/ti";

export default function InputImage({
    file,
    index,
    handleDeleteImage,
}: {
    file : File;
    index: number;
    handleDeleteImage: (index: number) => void;
}) {
    const url = URL.createObjectURL(file);

    return (
        <div className="border border-1 rounded-lg relative">
            <TiDelete
                className="absolute end-0 inset-y-0 hover:opacity-80 scale-150 cursor-pointer text-red-500"
                onClick={() => handleDeleteImage(index)}
            />
            <img
                src={url}
                alt="Image"
                className="rounded-lg overflow-hidden object-cover max-w-[200px] h-auto"
            />
        </div>
    );
}
