
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import ChatList from '@/components/Messages/ChatList';
import ChatWindow, { Message } from '@/components/Messages/ChatWindow';
import { useToast } from '@/components/ui/use-toast';
import { ChatContact } from '@/components/Messages/ChatListTypes';

// Sample data
const mockContacts: ChatContact[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    phone: "+90 555 123 4567",
    online: true,
    lastMessage: "Siparişim hakkında bilgi almak istiyorum.",
    time: "09:30"
  },
  {
    id: "2",
    name: "Ayşe Demir",
    phone: "+90 532 987 6543",
    lastSeen: "Bugün 14:30",
    lastMessage: "Ürünleriniz hakkında bilgi almak istiyorum.",
    time: "Dün 15:40"
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    phone: "+90 541 234 5678",
    lastSeen: "Dün 18:45",
    lastMessage: "Siparişimin durumu nedir?",
    time: "Pazartesi 11:20"
  }
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      content: "Merhaba, siparişim hakkında bilgi alabilir miyim?",
      time: "09:30",
      sender: "customer",
    },
    {
      id: "m2",
      content: "Tabii, hangi siparişiniz hakkında bilgi almak istiyorsunuz?",
      time: "09:32",
      sender: "user",
      status: "read",
    },
    {
      id: "m3",
      content: "Geçen hafta verdiğim mobilya siparişi. Teslimat tarihi nedir?",
      time: "09:33",
      sender: "customer",
    },
    {
      id: "m4",
      content: "Siparişiniz hazırlanıyor. Tahmini teslimat tarihi önümüzdeki Salı günü.",
      time: "09:35",
      sender: "user",
      status: "read",
    }
  ],
  "2": [
    {
      id: "m5",
      content: "İyi günler, ürünleriniz hakkında bilgi almak istiyorum.",
      time: "Dün 15:40",
      sender: "customer",
    },
    {
      id: "m6",
      content: "Merhaba, hangi ürünlerimizle ilgileniyorsunuz?",
      time: "Dün 15:45",
      sender: "user",
      status: "read",
    }
  ],
  "3": [
    {
      id: "m7",
      content: "Siparişimin durumu nedir?",
      time: "Pazartesi 11:20",
      sender: "customer",
    },
    {
      id: "m8",
      content: "Siparişiniz kargoya verildi, bugün teslim edilecek.",
      time: "Pazartesi 11:25",
      sender: "user",
      status: "read",
    },
    {
      id: "m9",
      content: "Teşekkür ederim.",
      time: "Pazartesi 11:30",
      sender: "customer",
    }
  ]
};

const EmptyChatState = () => (
  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Sohbet seçilmedi</h3>
    <p className="text-gray-500 max-w-sm">
      Mesajlaşmaya başlamak için soldaki listeden bir müşteri seçin veya yeni bir sohbet başlatın.
    </p>
  </div>
);

const Messages = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ChatContact[]>(mockContacts);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  const handleSelectContact = (contactId: string) => {
    setActiveContactId(contactId);
  };

  const handleSendMessage = (contactId: string, content: string) => {
    // Create a new message
    const newMessage: Message = {
      id: `m${Date.now()}`,
      content,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
      status: 'sent',
    };

    // Update messages state
    setMessages(prevMessages => ({
      ...prevMessages,
      [contactId]: [...(prevMessages[contactId] || []), newMessage],
    }));

    // Simulate response after a delay
    setTimeout(() => {
      const autoReply: Message = {
        id: `m${Date.now() + 1}`,
        content: "Bu otomatik bir yanıttır. Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        sender: 'customer',
      };

      setMessages(prevMessages => ({
        ...prevMessages,
        [contactId]: [...(prevMessages[contactId] || []), autoReply],
      }));

      toast({
        title: "Yeni Mesaj",
        description: "Müşteriden yeni bir mesaj alındı.",
      });
    }, 3000);
  };

  const selectedContact = activeContactId ? contacts.find(c => c.id === activeContactId) : null;
  const selectedMessages = activeContactId ? messages[activeContactId] || [] : [];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Mesajlar</h1>
        <p className="text-gray-600">WhatsApp mesajlarınızı yönetin.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="md:col-span-1">
          <ChatList
            contacts={contacts}
            activeContactId={activeContactId || ''}
            onSelectContact={handleSelectContact}
          />
        </div>
        
        <div className="md:col-span-2">
          {selectedContact ? (
            <ChatWindow 
              contact={selectedContact} 
              messages={selectedMessages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <EmptyChatState />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
