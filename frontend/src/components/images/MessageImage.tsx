export const MessageImage = ({ image }: { image: string }) => {
    return (
        <div className="border border-1 rounded-lg">
            <img
                src={image}
                alt="Image"
                className="rounded-lg overflow-hidden object-cover w-fit h-[100px]"
            />
        </div>
    );
};
