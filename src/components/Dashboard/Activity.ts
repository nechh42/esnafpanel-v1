
export type ActivityType = 'message' | 'order' | 'customer';

export interface Activity {
  id: string;
  type: ActivityType;
  name: string;
  description: string;
  time: string;
}
