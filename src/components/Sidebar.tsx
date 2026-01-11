import type { Conversation } from "./ChatDashboard";
import icon from "../assets/icon.png";
import { ImUser } from "react-icons/im";
import { FaLeaf, FaLightbulb } from "react-icons/fa";
import { GiButterflyFlower } from "react-icons/gi";
interface SidebarProps {
  conversations: Conversation[];
  currentAgent: string;
  onAgentChange: (agent: string) => void;
}

const Sidebar = ({
  conversations,
  currentAgent,
  onAgentChange,
}: SidebarProps) => {
  const agents = [
    { name: "My HRBP", icon: <ImUser />, color: "bg-indigo-600", iconColor: "text-gray-600" },
    {
      name: "My Leadership Coach",
      icon: <FaLightbulb />,
      color: "bg-indigo-600",
      iconColor: "text-yellow-200",
    },
    { name: "My Growth Consultant", icon: <FaLeaf />, color: "bg-indigo-600", iconColor: "text-green-400" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <img src={icon} alt="" className="h-10" />
        <h1
          className="text-lg font-semibold uppercase inline
          bg-linear-to-b from-purple-600 to-indigo-600
          bg-clip-text text-transparent"
        >
          <span className="font-normal text-gray-800">Culture</span>telligence
        </h1>
      </div>

      {/* Agents Section */}
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          MY AGENTS
        </h2>
        <div className="space-y-1">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => onAgentChange(agent.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
              ${
                currentAgent === agent.name
                  ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
              }
            `}
            >
              <div
                className={`w-8 h-8 rounded-full ${agent.color} flex items-center justify-center ${agent.iconColor} text-sm`}
              >
                {agent.icon}
              </div>
              <span className="text-sm font-medium">{agent.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Previous Conversations */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          PREVIOUS CONVERSATIONS
        </h2>
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm text-gray-700 line-clamp-2">
                {conversation.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
