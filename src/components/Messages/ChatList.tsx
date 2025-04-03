import React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { ChatContact } from './ChatListTypes';

interface ChatListProps {
  contacts: ChatContact[];
  activeContactId?: string;
  onSelectContact: (contactId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ contacts, activeContactId, onSelectContact }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border h-full overflow-hidden">
      <div className="p-4 border-b">
        <input 
          type="text" 
          placeholder="Müşteri ara..." 
          className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-5rem)]">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
              activeContactId === contact.id && "bg-primary/5"
            )}
            onClick={() => onSelectContact(contact.id)}
          >
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
              
              <div className="flex-1 ml-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-600 truncate max-w-[150px]">
                    {contact.lastMessage}
                  </p>
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <span className="bg-whatsapp text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
