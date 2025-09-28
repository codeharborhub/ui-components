import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Task } from '../components/features/TaskCard/TaskCard';
import type { Database } from '../lib/supabase';

type TaskRow = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTasks: Task[] = (data || []).map((task: TaskRow) => ({
        id: task.id,
        title: task.title,
        description: task.description || undefined,
        completed: task.completed,
        priority: task.priority,
        dueDate: task.due_date || undefined,
        createdAt: task.created_at,
      }));

      setTasks(formattedTasks);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const newTask: TaskInsert = {
        title: taskData.title,
        description: taskData.description || null,
        priority: taskData.priority,
        due_date: taskData.dueDate || null,
        user_id: user.id,
        completed: false,
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();

      if (error) throw error;

      const formattedTask: Task = {
        id: data.id,
        title: data.title,
        description: data.description || undefined,
        completed: data.completed,
        priority: data.priority,
        dueDate: data.due_date || undefined,
        createdAt: data.created_at,
      };

      setTasks(prev => [formattedTask, ...prev]);
      return formattedTask;
    } catch (err) {
      console.error('Error creating task:', err);
      throw err;
    }
  };

  const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const taskUpdate: TaskUpdate = {
        ...(updates.title && { title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description || null }),
        ...(updates.completed !== undefined && { completed: updates.completed }),
        ...(updates.priority && { priority: updates.priority }),
        ...(updates.dueDate !== undefined && { due_date: updates.dueDate || null }),
      };

      const { data, error } = await supabase
        .from('tasks')
        .update(taskUpdate)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedTask: Task = {
        id: data.id,
        title: data.title,
        description: data.description || undefined,
        completed: data.completed,
        priority: data.priority,
        dueDate: data.due_date || undefined,
        createdAt: data.created_at,
      };

      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    await updateTask(id, { completed: !task.completed });
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    refreshTasks: fetchTasks,
  };
};