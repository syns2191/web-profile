'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin-layout';
import apiClient from '@/libs/api-client';
import { io, Socket } from 'socket.io-client';
import { config } from '@/config/app.config';

interface Message {
  _id?: string;
  message: string;
  sender: string;
  to: string;
  createdAt: string;
  name: string;
  profileId: string;
  conversationId: string;
  read: boolean;
}

interface Conversation {
  conversationId: string;
  lastMessage: Message;
}


interface conversationMessages {
  conversationId: string;
  messages: Message[]
}

let socket: Socket | null = null;

const ChatConversationsPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false); // New state for mobile view
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<conversationMessages | null>(null)
  const [adminProfileId, setAdminProfileId] = useState<string | null>(null);

  const getConversation = async () => {
    const response = await apiClient.get(`/api/chat/conversations/${'68a09522a15fa940052244c3'}`);
    const conversations = response.data;
    setConversations(conversations);
  }

  useEffect(() => {
    getConversation();
    if (!socket) {
      socket = io(config.NEXT_PUBLIC_API_URL, { query: { role: 'owner' }});
      socket.on('connect', () => {
        const user: string | null = localStorage.getItem('user');
        if (user) {
          const userParse = JSON.parse(user);
          setAdminProfileId(userParse?._id); // Set adminProfileId
          socket?.emit('profile:join', {
            profileId: userParse?._id,
            name: userParse?.email
          });
        }
      })
      socket?.on('conv:message', (m: Message) => {
        setConversations((prev) => {
          if (prev.some((pv) => pv.conversationId === m.conversationId)) {
            return prev.map((conv) => conv.conversationId === m.conversationId ? { ...conv, lastMessage: m } : conv)
          }
          return [...prev, {conversationId: m.conversationId, lastMessage: m }]
        });
      })
      socket?.on('guest:read:message', (m) => {
        console.log('guest read message', m);
        setConversationMessages((prev) => prev && prev?.conversationId === m.conversationId ? {
          ...prev, messages: prev?.messages.map((x) => {
            if (x.to === m.to) {
              x.read = true;
            }
            return x;
          })
        } : prev);
      })
      socket?.on('chat:admin:echo', (m: Message) => {
        console.log('message admin echo', m);
        setConversationMessages((prev) => prev?.conversationId === m.conversationId ? { ...prev, messages: [...prev.messages, m] } : prev);
      });
      socket?.on('visitor:message', (m: Message) => {
        console.log('visitor message', m);
        setConversationMessages((prev) => prev?.conversationId === m.conversationId ? { ...prev, messages: [...prev.messages, m] } : prev);
        setConversations((prev) => prev.map((conv) => conv.conversationId === m.conversationId ? { ...conv, lastMessage: m } : conv));
      })
    }
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    }
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [selectedConversation, conversationMessages]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '' || !selectedConversationId) return;

    const newMessage: Message = {
      message: messageInput,
      sender: selectedConversation?.lastMessage?.profileId ?? '', // Admin is sending the messagej
      createdAt: new Date().toISOString(),
      to: selectedConversation?.lastMessage.name ?? '',
      profileId: selectedConversation?.lastMessage.profileId ?? '',
      name: selectedConversation?.lastMessage.name ?? '',
      conversationId: selectedConversationId,
      read: false
    };
    socket?.emit('admin:message', newMessage);
    setMessageInput('');
  };

  const getConversationMessage = async (convId: string) => {
    const response = await apiClient.get(`/api/chat/${convId}`);
    const chatMessage: Message[] = response.data;
    setConversationMessages({ conversationId: convId, messages: chatMessage });
  }

  const handleSelectConversation = (convId: string, to: string) => {
    setSelectedConversationId(convId);
    const selectConv = conversations.find((conv) => conv.conversationId === convId);
    if (selectConv) {
      setSelectedConversation(selectConv);
    }
    getConversationMessage(convId);
    socket?.emit('admin:join', { conversationId: convId });
    setConversations((prev) => prev.map((conv) => conv.conversationId === convId ? { ...conv, lastMessage: { ...conv.lastMessage, read: true } } : conv));
    socket?.emit('read:message', { conversationId: convId, to: to })
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
              {conversations.sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()).map((conv) => (
                <li
                  key={conv.conversationId}
                  className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${selectedConversationId === conv.conversationId ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  onClick={() => handleSelectConversation(conv.conversationId, conv.lastMessage.to)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg flex items-center">
                      {conv.lastMessage.name}
                    </span>
                    {conv.lastMessage.sender !== adminProfileId && !conv.lastMessage.read && (
                      <span className="ml-2 w-2 h-2 text-right rounded-full bg-red-600"></span>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conv.lastMessage.message}
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
                  Chat with {selectedConversation.lastMessage.name}
                </h3>
              </div>
              <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {conversationMessages?.messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex mb-4 ${message.sender === selectedConversation.lastMessage.profileId ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg shadow ${message.sender === selectedConversation.lastMessage.profileId
                        ? 'bg-gray-300 text-gray-800'
                        : 'bg-blue-500 text-white'
                        }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <span className="block text-xs mt-1 opacity-75 flex items-center">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {message.sender === adminProfileId && (
                          <svg
                            className="ml-1 h-4 w-4 text-green-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                            {
                              message.read && (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17 9l-4 4-2-2"
                                ></path>
                              )
                            }
                          </svg>
                        )}
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
                  onKeyDown={(e) => {
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
