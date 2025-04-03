
import React from 'react';
import { cn } from '@/lib/utils';
import { Activity } from './Activity';

interface RecentActivitiesListProps {
  activities: Activity[];
  className?: string;
}

const RecentActivitiesList: React.FC<RecentActivitiesListProps> = ({ activities, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm border p-6", className)}>
      <h2 className="text-lg font-semibold mb-4">Son Aktiviteler</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div
              className={cn(
                "w-3 h-3 rounded-full mt-1.5 mr-3",
                activity.type === 'message' && "bg-whatsapp",
                activity.type === 'order' && "bg-blue-500",
                activity.type === 'customer' && "bg-purple-500"
              )}
            />
            <div className="flex-1">
              <h3 className="font-medium">{activity.name}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitiesList;
