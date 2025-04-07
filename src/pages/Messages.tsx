
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Phone, Send, Image, Smile, Paperclip, User, Search } from 'lucide-react';
import ChatWindow from '@/components/Messages/ChatWindow';
import ChatList from '@/components/Messages/ChatList';
import { useToast } from '@/hooks/use-toast';
import { ChatContact } from '@/components/Messages/ChatListTypes';
import { Message } from '@/components/Messages/ChatWindow';

const Messages = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [emptyState, setEmptyState] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    // Check if demo mode
    const demoMode = localStorage.getItem('demoMode');
    if (demoMode) {
      setIsDemoMode(JSON.parse(demoMode));
    }
    
    // Check if chat data exists
    const chatData = localStorage.getItem('chatData');
    if (chatData) {
      const parsedData = JSON.parse(chatData);
      if (parsedData && parsedData.length > 0) {
        setEmptyState(false);
        setContacts(parsedData);
      }
    } else {
      // Create empty chat data
      setEmptyState(true);
      setContacts([]);
      localStorage.setItem('chatData', JSON.stringify([]));
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) {
      return;
    }
    
    if (!selectedChat) {
      toast({
        title: "Hata",
        description: "Lütfen önce bir sohbet seçin.",
        variant: "destructive",
      });
      return;
    }
    
    if (isDemoMode) {
      toast({
        title: "Demo Modu",
        description: "Demo modunda mesaj gönderme özelliği sınırlıdır. Lütfen bir abonelik planı seçin.",
      });
      return;
    }
    
    // In a real app, here we would send the message via API
    // For now, we'll just clear the input
    setMessageInput('');
    
    toast({
      title: "Mesaj Gönderildi",
      description: "Mesajınız başarıyla gönderildi.",
    });
  };

  const getSelectedContact = () => {
    if (!selectedChat) return null;
    return contacts.find(contact => contact.id === selectedChat);
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedChat(contactId);
    // In a real app, here we would fetch messages for this contact
    setMessages([]);
  };
  
  return (
    <MainLayout>
      <div className="h-full flex flex-col md:flex-row">
        {/* Sidebar/Chat List */}
        <div className="w-full md:w-80 border-r flex-shrink-0 h-full overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Müşteri veya mesaj ara..."
                className="pl-9"
              />
            </div>
          </div>
          
          <Tabs defaultValue="whatsapp" className="h-[calc(100%-73px)]">
            <div className="border-b px-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="whatsapp" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>WhatsApp</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Mesajlar</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="whatsapp" className="h-full overflow-auto m-0">
              {emptyState ? (
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-muted h-24 w-24 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">WhatsApp Mesajları</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    WhatsApp Business API ile bağlanarak müşterilerinizle sohbet edin.
                  </p>
                  <Button>WhatsApp'ı Bağla</Button>
                </div>
              ) : (
                <ChatList 
                  contacts={contacts} 
                  activeContactId={selectedChat || undefined} 
                  onSelectContact={handleSelectContact} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="chat" className="h-full overflow-auto m-0">
              <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-muted h-24 w-24 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Web Sohbet Mesajları</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Web siteniz üzerinden gelen sohbet mesajları burada görüntülenecek.
                </p>
                <Button variant="outline">Web Sohbeti Etkinleştir</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Chat window */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {selectedChat && getSelectedContact() ? (
            <>
              <ChatWindow 
                contact={getSelectedContact() as ChatContact} 
                messages={messages} 
                onSendMessage={(contactId, message) => {
                  // Handle sending messages
                  console.log(`Sending message to ${contactId}: ${message}`);
                }}
              />
              
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                    <Image className="h-5 w-5" />
                  </Button>
                  
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1"
                  />
                  
                  <Button type="submit" size="icon" className="flex-shrink-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center">
              <div className="bg-muted h-24 w-24 rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Mesaj Görüntüleyici</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Görüntülemek için sol taraftan bir sohbet seçin veya yeni bir görüşme başlatın.
              </p>
              <Button>Yeni Mesaj</Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
