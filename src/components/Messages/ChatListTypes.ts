
export interface ChatContact {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  avatar?: string;
  online?: boolean;
  lastSeen?: string;
}
