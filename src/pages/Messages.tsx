
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import ChatList, { ChatContact } from '@/components/Messages/ChatList';
import ChatWindow, { Message } from '@/components/Messages/ChatWindow';

const mockContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    lastMessage: 'Merhaba, siparişim ne zaman gelecek?',
    time: '14:30',
    unreadCount: 2,
    online: true
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    lastMessage: 'Teşekkürler, iyi günler!',
    time: 'Dün',
    online: false
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    lastMessage: 'Fiyat listesini gönderebilir misiniz?',
    time: 'Dün',
    unreadCount: 1,
    online: false
  },
  {
    id: '4',
    name: 'Zeynep Şahin',
    lastMessage: 'Tamam, anladım.',
    time: '07.06',
    online: true
  },
  {
    id: '5',
    name: 'Mustafa Öztürk',
    lastMessage: 'Stokta var mı?',
    time: '03.06',
    online: false
  }
];

const mockContactDetails: Record<string, { phone: string; lastSeen?: string }> = {
  '1': { phone: '+90 555 123 4567' },
  '2': { phone: '+90 555 987 6543', lastSeen: 'Bugün, 09:15' },
  '3': { phone: '+90 555 456 7890', lastSeen: 'Dün, 18:30' },
  '4': { phone: '+90 555 234 5678' },
  '5': { phone: '+90 555 345 6789', lastSeen: '03.06, 14:20' }
};

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      content: 'Merhaba, siparişim ne zaman gelecek?',
      time: '14:30',
      sender: 'customer'
    },
    {
      id: '102',
      content: 'Merhaba Ahmet Bey, siparişiniz yarın kargoya verilecek.',
      time: '14:35',
      sender: 'user',
      status: 'read'
    },
    {
      id: '103',
      content: 'Teşekkür ederim. Kargo takip numarasını da gönderebilir misiniz?',
      time: '14:40',
      sender: 'customer'
    }
  ],
  '2': [
    {
      id: '201',
      content: 'Ürünleriniz hakkında bilgi almak istiyorum.',
      time: 'Dün, 08:30',
      sender: 'customer'
    },
    {
      id: '202',
      content: 'Merhaba Ayşe Hanım, hangi ürünlerle ilgileniyorsunuz?',
      time: 'Dün, 09:00',
      sender: 'user',
      status: 'read'
    },
    {
      id: '203',
      content: 'Teşekkürler, iyi günler!',
      time: 'Dün, 09:15',
      sender: 'customer'
    }
  ],
  '3': [
    {
      id: '301',
      content: 'Fiyat listesini gönderebilir misiniz?',
      time: 'Dün, 18:30',
      sender: 'customer'
    }
  ],
  '4': [
    {
      id: '401',
      content: 'Merhaba, siparişimde değişiklik yapmak istiyorum.',
      time: '07.06, 10:15',
      sender: 'customer'
    },
    {
      id: '402',
      content: 'Merhaba Zeynep Hanım, ne gibi bir değişiklik yapmak istiyorsunuz?',
      time: '07.06, 10:30',
      sender: 'user',
      status: 'read'
    },
    {
      id: '403',
      content: 'Farklı bir renk seçmek istiyorum.',
      time: '07.06, 10:45',
      sender: 'customer'
    },
    {
      id: '404',
      content: 'Tabii, sipariş henüz hazırlanmadı. Hangi rengi tercih edersiniz?',
      time: '07.06, 11:00',
      sender: 'user',
      status: 'read'
    },
    {
      id: '405',
      content: 'Tamam, anladım.',
      time: '07.06, 11:15',
      sender: 'customer'
    }
  ],
  '5': [
    {
      id: '501',
      content: 'Stokta var mı?',
      time: '03.06, 14:20',
      sender: 'customer'
    }
  ]
};

const Messages = () => {
  const [activeContactId, setActiveContactId] = useState<string>('1');
  
  const handleSelectContact = (contactId: string) => {
    setActiveContactId(contactId);
  };
  
  const getSelectedContactInfo = () => {
    const contact = mockContacts.find(c => c.id === activeContactId);
    const details = mockContactDetails[activeContactId];
    
    if (!contact || !details) return null;
    
    return {
      ...contact,
      ...details
    };
  };
  
  const selectedContact = getSelectedContactInfo();

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Mesajlar</h1>
        <p className="text-gray-600">WhatsApp mesajlarınızı yönetin.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <div className="md:col-span-1">
          <ChatList 
            contacts={mockContacts} 
            activeContactId={activeContactId}
            onSelectContact={handleSelectContact} 
          />
        </div>
        
        <div className="md:col-span-2">
          {selectedContact ? (
            <ChatWindow 
              contact={selectedContact} 
              messages={mockMessages[activeContactId] || []} 
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-sm border">
              <p className="text-gray-500">Lütfen bir sohbet seçin</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
