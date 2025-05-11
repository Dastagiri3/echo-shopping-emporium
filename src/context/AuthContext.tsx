
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AuthContextType, User } from '@/types';

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  loading: false
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('amazonCloneUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('amazonCloneUser');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function (in a real app, this would call an API)
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (in a real app, the server would validate)
      if (email === 'user@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com'
        };
        
        setUser(userData);
        localStorage.setItem('amazonCloneUser', JSON.stringify(userData));
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email && password && name) {
        const userData: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email
        };
        
        setUser(userData);
        localStorage.setItem('amazonCloneUser', JSON.stringify(userData));
        toast({
          title: 'Account created',
          description: 'Your account has been created successfully!',
        });
      } else {
        throw new Error('Please fill all required fields');
      }
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('amazonCloneUser');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
