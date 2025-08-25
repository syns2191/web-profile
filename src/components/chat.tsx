'use client'
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { config } from '@/config/app.config';

interface ChatMessage {
  text: string;
  sender: 'user' | 'sutralia' | 'Bot' | 'System';
}

let socket: Socket | null = null;

type TPropChat = {
  userId: string
}

function getOrCreateVisitorId(): string {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = "visitor_" + crypto.randomUUID().slice(0, 8); 
    localStorage.setItem("visitor_id", id);
  }
  return id;
}

export function Chats(props: TPropChat) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Hello! How can I help you today?', sender: 'sutralia' },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && !socket) {
      // Connect to Socket.IO server
      socket = io(config.NEXT_PUBLIC_API_URL); // Replace with your Socket.IO server URL

      const storedId = localStorage.getItem("conversationId");

      socket.on("connect", () => {
        socket?.emit("visitor:join", { conversationId: storedId });
      });

      socket.on("system:welcome", ({ conversationId }) => {
        setConversationId(conversationId);
        localStorage.setItem("conversationId", conversationId);
      });

      socket.on("chat:echo", (m) =>
        setMessages((prev) => [...prev, { sender: 'user', text: m.message }])
      );
      socket.on("admin:reply", (m) =>
        setMessages((prev) => [...prev, { sender: 'sutralia', text: m.message }])
      );
      socket.on("bot:reply", (m) =>
        setMessages((prev) => [...prev, { sender: 'Bot', text: m.text }])
      );
      socket.on("system:info", (m) =>
        setMessages((prev) => [...prev, { sender: 'System', text: m.text }])
      );

      socket.on('chat message', (msg: string) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: msg, sender: 'sutralia' },
        ]);
      });
    }

    if (!isChatOpen && socket) {
      socket.disconnect();
      socket = null;
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [isChatOpen]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {

      if (socket) {
        socket.emit("visitor:message", {
          name: getOrCreateVisitorId(), // optional: collect from profile form
          message: messageInput,
          conversationId: localStorage.getItem("conversationId"),
          profileId: props.userId
        });
      }
      setMessageInput('');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 bg-[var(--color-primary-accent)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--color-primary-medium)] transition-all duration-300 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
      {
        isChatOpen && (
          <div className="fixed inset-0 md:bottom-24 md:right-8 md:w-96 md:h-[500px] md:max-h-[80vh] md:inset-auto bg-white dark:bg-[var(--color-primary-dark)] rounded-lg shadow-2xl flex flex-col z-50">
            <div className="bg-[var(--color-primary-medium)] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h4 className="font-semibold">Chat with Sutralia</h4>
              <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto text-[var(--color-primary-dark)] dark:text-white">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[70%] ${msg.sender === 'user'
                      ? 'bg-[var(--color-primary-accent)] text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-[var(--color-primary-dark)] dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)]"
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
                className="ml-2 bg-[var(--color-primary-accent)] text-white p-2 rounded-lg hover:bg-[var(--color-primary-medium)] transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}
