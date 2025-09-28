import React from 'react';
import { Card, CardContent, Badge, Button } from '../../ui';
import { Calendar, Clock, Trash2, CheckCircle, Circle } from 'lucide-react';
import { formatDate } from '../../../lib/utils';
import { motion } from 'framer-motion';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

export interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'danger',
  } as const;

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`transition-all duration-200 ${task.completed ? 'opacity-75 bg-gray-50' : 'hover:shadow-md'}`}
        padding="sm"
      >
        <CardContent padding="none" className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className="mt-0.5 text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {task.completed ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>
                <div className="flex-1">
                  <h3 
                    className={`font-medium text-gray-900 leading-tight ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`text-sm mt-1 ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Badge 
                variant={priorityColors[task.priority]} 
                size="sm"
              >
                {priorityLabels[task.priority]}
              </Badge>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{formatDate(task.createdAt)}</span>
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span className={
                    new Date(task.dueDate) < new Date() && !task.completed 
                      ? 'text-red-500 font-medium' 
                      : ''
                  }>
                    Due {formatDate(task.dueDate)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(task)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-blue-500"
                aria-label="Edit task"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                aria-label="Delete task"
              >
                <Trash2 size={12} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export { TaskCard };