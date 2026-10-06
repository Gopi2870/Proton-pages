import React, { useState } from 'react';
import { Modal } from '../common/Modal';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'lab' | 'academic' | 'ai' | 'system';
  unread: boolean;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Titration Endpoint Verified',
      description: 'Virtual Lab #2 completed phenolphthalein neutralization run with 0.02 mL standard error.',
      time: '14 min ago',
      category: 'lab',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'CHEM 204 Midterm Assessment Ready',
      description: 'Prof. Alvarez opened the 12-question stereochemistry and reaction mechanism quiz.',
      time: '2 hours ago',
      category: 'academic',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'AI Tutor Generated Mechanism Card',
      description: 'Curved arrow electron flow diagram for Grignard addition to formaldehyde is ready.',
      time: '5 hours ago',
      category: 'ai',
      unread: true,
    },
    {
      id: 'notif-4',
      title: '14-Day Chemistry Streak Achieved',
      description: 'Congratulations Elena! You earned +850 XP and unlocked GPU Conformational Mode.',
      time: 'Yesterday',
      category: 'system',
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getIconForCategory = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'lab':
        return 'experiment';
      case 'academic':
        return 'school';
      case 'ai':
        return 'psychology';
      case 'system':
        return 'local_fire_department';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activity & Notifications" icon="notifications">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            {notifications.filter((n) => n.unread).length} Unread Notifications
          </span>
          <button
            onClick={markAllRead}
            type="button"
            className="text-primary hover:underline font-label-sm text-label-sm font-semibold"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                n.unread
                  ? 'bg-surface-container-low border-primary-fixed'
                  : 'bg-surface-container-lowest border-surface-container-low opacity-75'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">
                  {getIconForCategory(n.category)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    {n.title}
                  </h4>
                  <span className="font-code-sm text-[11px] text-outline">{n.time}</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {n.description}
                </p>
              </div>
              {n.unread && (
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
