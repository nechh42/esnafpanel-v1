
import React, { useState } from 'react';
import { Send, Paperclip, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export type Message = {
  id: string;
  content: string;
  time: string;
  sender: 'user' | 'customer';
  status?: 'sent' | 'delivered' | 'read';
};

export type ChatContact = {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  online?: boolean;
  lastSeen?: string;
};

interface ChatWindowProps {
  contact: ChatContact;
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    toast({
      title: "Mesaj Gönderme",
      description: "Mesaj gönderme yakında eklenecektir.",
    });
    
    setNewMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              {contact.avatar ? (
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-10 h-10 rounded-full object-cover" 
                />
              ) : (
                <span className="text-gray-500 font-medium">
                  {contact.name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            {contact.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          
          <div className="ml-3">
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-xs text-gray-500">
              {contact.online ? 'Çevrimiçi' : contact.lastSeen ? `Son görülme: ${contact.lastSeen}` : contact.phone}
            </p>
          </div>
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 whatsapp-chat-bg">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className={`flex justify-end items-center mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  <span className="text-xs">{message.time}</span>
                  {message.sender === 'user' && message.status && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 h-3 w-3"
                    >
                      {message.status === 'sent' && (
                        <path d="M20 6L9 17l-5-5" />
                      )}
                      {message.status === 'delivered' && (
                        <>
                          <path d="M18 6L7 17l-5-5" />
                          <path d="M22 6L11 17l-5-5" />
                        </>
                      )}
                      {message.status === 'read' && (
                        <>
                          <path d="M18 6L7 17l-5-5" />
                          <path d="M22 6L11 17l-5-5" fill="currentColor" />
                        </>
                      )}
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Mesaj yazın..."
            className="flex-1 border rounded-md px-3 py-2 min-h-[2.5rem] max-h-32 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={1}
          />
          
          <Button
            onClick={handleSendMessage}
            className="bg-whatsapp hover:bg-whatsapp-dark"
            size="icon"
            disabled={newMessage.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
