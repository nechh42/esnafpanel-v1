
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'new';
}
