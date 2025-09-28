import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card, CardHeader, CardTitle, CardContent } from '../../ui';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
type ResetFormData = z.infer<typeof resetSchema>;

type AuthMode = 'login' | 'signup' | 'reset';

export interface AuthFormProps {
  onLogin: (data: LoginFormData) => Promise<void>;
  onSignup: (data: Omit<SignupFormData, 'confirmPassword'>) => Promise<void>;
  onReset: (data: ResetFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  onLogin, 
  onSignup, 
  onReset, 
  isLoading = false, 
  error 
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '' },
  });

  const handleLogin = async (data: LoginFormData) => {
    await onLogin(data);
  };

  const handleSignup = async (data: SignupFormData) => {
    await onSignup({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  const handleReset = async (data: ResetFormData) => {
    await onReset(data);
  };

  const titles = {
    login: 'Welcome Back',
    signup: 'Create Account',
    reset: 'Reset Password',
  };

  const descriptions = {
    login: 'Sign in to your account to continue',
    signup: 'Create a new account to get started',
    reset: 'Enter your email to reset your password',
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {titles[mode]}
        </CardTitle>
        <p className="text-sm text-gray-600 text-center">
          {descriptions[mode]}
        </p>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail size={16} />}
              error={loginForm.formState.errors.email?.message}
              required
              {...loginForm.register('email')}
            />
            
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                leftIcon={<Lock size={16} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                error={loginForm.formState.errors.password?.message}
                required
                {...loginForm.register('password')}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setMode('reset')}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
              disabled={isLoading}
            >
              Sign In
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              leftIcon={<User size={16} />}
              error={signupForm.formState.errors.fullName?.message}
              required
              {...signupForm.register('fullName')}
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail size={16} />}
              error={signupForm.formState.errors.email?.message}
              required
              {...signupForm.register('email')}
            />
            
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              leftIcon={<Lock size={16} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              error={signupForm.formState.errors.password?.message}
              required
              {...signupForm.register('password')}
            />
            
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              leftIcon={<Lock size={16} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              error={signupForm.formState.errors.confirmPassword?.message}
              required
              {...signupForm.register('confirmPassword')}
            />

            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create Account
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {mode === 'reset' && (
          <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail size={16} />}
              error={resetForm.formState.errors.email?.message}
              helperText="We'll send you a link to reset your password"
              required
              {...resetForm.register('email')}
            />

            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
              disabled={isLoading}
            >
              Send Reset Link
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Back to sign in
              </button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export { AuthForm };