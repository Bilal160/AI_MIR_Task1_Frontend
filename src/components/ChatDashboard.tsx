import { useState } from 'react';
import Sidebar from './Sidebar.tsx';  
import ChatArea from './ChatArea.tsx';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const ChatDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(
    [
      {
        id: '1',
        title: 'When did Brittany Davis join the company...',
        lastMessage: 'Previous conversation',
        timestamp: new Date(Date.now() - 86400000),
      },
    ]
  );
  const [currentAgent, setCurrentAgent] = useState('My HRBP');

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://aimirtaskbackend-production.up.railway.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: messages[0].text.substring(0, 50) + '...',
        lastMessage: messages[messages.length - 1].text,
        timestamp: new Date(),
      };
      setConversations((prev) => [newConversation, ...prev]);
    }
    setMessages([]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar
        conversations={conversations}
        currentAgent={currentAgent}
        onAgentChange={setCurrentAgent}
      />
      <ChatArea
        messages={messages}
        inputValue={inputValue}
        isLoading={isLoading}
        currentAgent={currentAgent}
        onInputChange={setInputValue}
        onSendMessage={handleSendMessage}
        onNewChat={handleNewChat}
      />
    </div>
  );
};

export default ChatDashboard;
