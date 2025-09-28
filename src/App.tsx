import React, { createContext, useState } from 'react';
import { useAuthProvider, AuthContext } from './hooks/useAuth';
import { TaskManagerApp } from './pages/TaskManagerApp';
import { AuthPage } from './pages/AuthPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const auth = useAuthProvider();

  if (auth.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          {auth.user ? (
            <TaskManagerApp key="app" />
          ) : (
            <AuthPage key="auth" />
          )}
        </AnimatePresence>
      </div>
    </AuthContext.Provider>
  );
}

export default App;