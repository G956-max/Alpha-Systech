import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';

type Role = 'user' | 'admin';

interface AuthContextType {
  isLoggedIn: boolean;
  role: Role | null;
  user: User | null;
  loginAdmin: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthReady: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Standard Admin ID
const ADMIN_EMAIL = 'admin@alphasystech.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Admin check based on standard ID
        const adminEmails = ['admin@alphasystech.com', 'gopinathsumathi05@gmail.com', 'admin@21gmail.com'];
        if (adminEmails.includes(currentUser.email || '')) {
          setRole('admin');
        } else {
          setRole('user');
        }
      } else {
        setRole(null);
      }
      setIsAuthReady(true);
    });
    return unsubscribe;
  }, []);

  const loginAdmin = async (email: string, password: string) => {
    const adminEmails = ['admin@alphasystech.com', 'gopinathsumathi05@gmail.com', 'admin@21gmail.com'];
    if (!adminEmails.includes(email)) {
      throw new Error('Unauthorized: Only the standard admin ID can login here.');
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error: Please check your internet connection or disable ad-blockers and try again.');
      }
      throw new Error(error.message || 'Failed to sign in as admin. Please ensure Email/Password auth is enabled in Firebase Console.');
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error: Please check your internet connection or disable ad-blockers and try again.');
      }
      throw new Error(error.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  const signupUser = async (email: string, password: string) => {
    const path = 'users';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user data to Firestore
      await setDoc(doc(db, path, userCredential.user.uid), {
        email,
        role: 'user',
        createdAt: serverTimestamp()
      });
    } catch (error: any) {
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error: Please check your internet connection or disable ad-blockers and try again.');
      }
      if (error.code === 'permission-denied' || error.message?.includes('insufficient permissions')) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
      throw new Error(error.message || 'Failed to sign up.');
    }
  };
  
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, role, user, loginAdmin, loginUser, signupUser, logout, isAuthReady, loading: !isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

