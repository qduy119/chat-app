import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
    return (
        <div className="flex sm:max-h-[600px] md:max-h-[700px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-gray-500 border-2">
            <Sidebar />
            <MessageContainer />
        </div>
    );
};
export default Home;
