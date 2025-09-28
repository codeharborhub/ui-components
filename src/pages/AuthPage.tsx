import React, { useState } from 'react';
import { AuthForm } from '../components/features/AuthForm/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Users, Zap } from 'lucide-react';

const AuthPage: React.FC = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      await signIn(data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: { fullName: string; email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      await signUp(data.email, data.password, data.fullName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      await resetPassword(data.email);
      setResetSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to your email address.
          </p>
          <button
            onClick={() => setResetSent(false)}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Back to sign in
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero section */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-12 text-white flex-col justify-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Target className="w-12 h-12 mb-6" />
            <h1 className="text-4xl font-bold mb-6">
              Welcome to TaskFlow
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Your personal task management solution built with our custom component library. 
              Experience beautiful, accessible, and responsive design.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Create and organize tasks with ease</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Built with accessibility in mind</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Powered by our custom UI components</span>
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-sm text-blue-100 mb-2">Component Library Demo</p>
            <p className="text-xs text-blue-200">
              This app showcases our reusable UI components: forms, buttons, cards, modals, and more.
              All components are fully accessible and ready for production use.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <Target className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">TaskFlow</h1>
              <p className="text-gray-600">Component Library Demo App</p>
            </div>

            <AuthForm
              onLogin={handleLogin}
              onSignup={handleSignup}
              onReset={handleReset}
              isLoading={isLoading}
              error={error}
            />

            <motion.div 
              className="mt-8 text-center text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p>Demo application showcasing our custom UI component library</p>
              <p className="mt-1">Built with React, TypeScript, Tailwind CSS, and Supabase</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };