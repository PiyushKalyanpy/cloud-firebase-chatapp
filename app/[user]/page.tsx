import ChatBubbleScroll from "@/components/ChatBubbleScroll";
import ChatHeader from "@/components/ChatHeader";
import ChatInputs from "@/components/ChatInputs";

const User = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            <ChatHeader/>
            <ChatBubbleScroll />
            <ChatInputs/>
        </div>
    );
}

export default User;