import type { Message } from './ChatDashboard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatAreaProps {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  currentAgent: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onNewChat: () => void;
}

const ChatArea = ({
  messages,
  inputValue,
  isLoading,
  currentAgent,
  onInputChange,
  onSendMessage,
  onNewChat,
}: ChatAreaProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const components = {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold mb-4 mt-2 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold mb-3 mt-2 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-bold mb-2 mt-2 text-gray-900">{children}</h3>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 last:mb-0 leading-relaxed text-gray-700">{children}</p>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4 rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50">{children}</thead>
    ),
    th: ({ children }: any) => (
      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {children}
      </td>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-sm font-semibold text-black">{currentAgent}</span>
        </div>
        <button
          onClick={onNewChat}
          className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors"
        >
          + New Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 py-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Hello, Abeer <span className="inline-block">👋</span>
            </h2>
            <p className="text-gray-500">How can I support you today?</p>
          </div>
        ) : (
          <div className=" mx-auto space-y-6 px-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white border border-gray-200 text-black'
                  }`}
                >
                  {message.sender === 'ai' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={components}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="w-full mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your team, HR insights..."
            className="flex-1 px-4 py-3 pb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-2xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;