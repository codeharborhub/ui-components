import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { TaskCard, Task } from '../components/features/TaskCard/TaskCard';
import { TaskForm } from '../components/features/TaskForm/TaskForm';
import { Button, Modal, Badge, Input } from '../components/ui';
import { 
  Plus, 
  LogOut, 
  Search, 
  // Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Target,
  User
} from 'lucide-react';

type FilterType = 'all' | 'completed' | 'pending' | 'overdue';

const TaskManagerApp: React.FC = () => {
  const { user, signOut } = useAuth();
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskComplete 
  } = useTasks();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    try {
      setIsCreating(true);
      await createTask(taskData);
      setShowCreateModal(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    if (!editingTask) return;
    
    try {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Search filter
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Status filter
    switch (activeFilter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'overdue':
        return !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length,
  };

  const filters = [
    { key: 'all', label: 'All', count: stats.total, icon: Target },
    { key: 'pending', label: 'Pending', count: stats.pending, icon: Clock },
    { key: 'completed', label: 'Completed', count: stats.completed, icon: CheckCircle2 },
    { key: 'overdue', label: 'Overdue', count: stats.overdue, icon: AlertCircle },
  ] as const;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b border-gray-200"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Component Library Demo</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />
                <span className="hidden sm:inline">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
                leftIcon={<LogOut size={16} />}
              >
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left hover:shadow-md ${
                  activeFilter === filter.key
                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={20} className={
                    activeFilter === filter.key ? 'text-blue-600' : 'text-gray-400'
                  } />
                  <Badge 
                    variant={filter.key === 'overdue' && filter.count > 0 ? 'danger' : 'default'}
                    size="sm"
                  >
                    {filter.count}
                  </Badge>
                </div>
                <p className={`font-medium ${
                  activeFilter === filter.key ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {filter.label}
                </p>
              </button>
            );
          })}
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            leftIcon={<Plus size={16} />}
            className="shrink-0"
          >
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </motion.div>

        {/* Task List */}
        <motion.div 
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <AnimatePresence>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskComplete}
                onDelete={handleDeleteTask}
                onEdit={setEditingTask}
              />
            ))}
          </AnimatePresence>

          {filteredTasks.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || activeFilter !== 'all' ? 'No matching tasks' : 'No tasks yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || activeFilter !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'Create your first task to get started'
                }
              </p>
              {(!searchQuery && activeFilter === 'all') && (
                <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus size={16} />}>
                  Create Task
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Create Task Modal */}
      <Modal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        title="Create New Task"
        description="Add a new task to your list"
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowCreateModal(false)}
          isLoading={isCreating}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        title="Edit Task"
        description="Update your task details"
        size="lg"
      >
        {editingTask && (
          <TaskForm
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            initialData={editingTask}
          />
        )}
      </Modal>
    </div>
  );
};

export { TaskManagerApp };