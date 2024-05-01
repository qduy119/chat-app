export default function GroupThumbnail({ file }: { file: File }) {
    const url = URL.createObjectURL(file);

    return (
        <img src={url} alt="Thumbnail" className="object-cover rounded-md" />
    );
}
