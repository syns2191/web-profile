'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin-layout';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: string;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  messages: Message[];
  lastMessageTimestamp: string;
}

// Dummy Data
const dummyConversations: Conversation[] = [
  {
    id: 'conv1',
    userId: 'user123',
    userName: 'Alice Smith',
    messages: [
      { id: 'msg1', text: 'Hi, I have a question about your portfolio.', sender: 'user', timestamp: '2024-07-20T10:00:00Z' },
      { id: 'msg2', text: 'Sure, how can I help you?', sender: 'admin', timestamp: '2024-07-20T10:05:00Z' },
      { id: 'msg3', text: 'I&apos;m interested in your React projects.', sender: 'user', timestamp: '2024-07-20T10:10:00Z' },
    ],
    lastMessageTimestamp: '2024-07-20T10:10:00Z',
  },
  {
    id: 'conv2',
    userId: 'user456',
    userName: 'Bob Johnson',
    messages: [
      { id: 'msg4', text: 'Hello, I saw your profile and have a job offer.', sender: 'user', timestamp: '2024-07-21T11:30:00Z' },
      { id: 'msg5', text: 'Great! Please tell me more.', sender: 'admin', timestamp: '2024-07-21T11:35:00Z' },
    ],
    lastMessageTimestamp: '2024-07-21T11:35:00Z',
  },
  {
    id: 'conv3',
    userId: 'user789',
    userName: 'Charlie Brown',
    messages: [
      { id: 'msg6', text: 'Just wanted to say your website is awesome!', sender: 'user', timestamp: '2024-07-22T14:00:00Z' },
      { id: 'msg7', text: 'Thank you so much!', sender: 'admin', timestamp: '2024-07-22T14:05:00Z' },
    ],
    lastMessageTimestamp: '2024-07-22T14:05:00Z',
  },
];

const ChatConversationsPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>(dummyConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false); // New state for mobile view
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '' || !selectedConversationId) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      text: messageInput,
      sender: 'admin', // Admin is sending the message
      timestamp: new Date().toISOString(),
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessageTimestamp: newMessage.timestamp,
            }
          : conv
      )
    );
    setMessageInput('');
  };

  const handleSelectConversation = (convId: string) => {
    setSelectedConversationId(convId);
    setIsMobileChatOpen(true); // Open chat view on mobile
  };

  const handleBackToConversations = () => {
    setIsMobileChatOpen(false);
    setSelectedConversationId(null); // Deselect conversation
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Chat Conversations</h2>
      <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Conversation List - Left Column */}
        <div className={`w-full md:w-1/3 border-r border-gray-200 overflow-y-auto ${isMobileChatOpen ? 'hidden md:block' : 'block'}`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Conversations</h3>
          </div>
          {conversations.length === 0 ? (
            <p className="p-4 text-gray-500">No conversations yet.</p>
          ) : (
            <ul>
              {conversations.sort((a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime()).map((conv) => (
                <li
                  key={conv.id}
                  className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                    selectedConversationId === conv.id ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                  onClick={() => handleSelectConversation(conv.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{conv.userName}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(conv.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conv.messages[conv.messages.length - 1]?.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chat Interface - Right Column */}
        <div className={`flex-1 flex flex-col ${isMobileChatOpen ? 'block' : 'hidden md:flex'}`}>
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
                <button
                  onClick={handleBackToConversations}
                  className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-200"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                  </svg>
                </button>
                <h3 className="text-xl font-semibold text-gray-700">
                  Chat with {selectedConversation.userName}
                </h3>
              </div>
              <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${
                      message.sender === 'admin' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg shadow ${
                        message.sender === 'admin'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="block text-xs mt-1 opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChatConversationsPage;
