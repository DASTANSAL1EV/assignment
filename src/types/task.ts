export const PRIORITIES = ['normal', 'middle', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number];

export type Filter = 'all' | 'active' | 'done' | Priority;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
  priority: Priority;
}