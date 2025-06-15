import { createContext, useContext, useEffect, useState } from "react";
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  full_name?: string;
  is_employer?: boolean;
  avatar_url?: string;
  // Add other profile fields as they are stored in your 'profiles' table
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (phone: string, password: string, captchaToken?: string) => Promise<{ error: AuthError | null }>;
  signUp: (phone: string, password: string, userData?: object, captchaToken?: string) => Promise<{ data?: { user: User | null; session: Session | null; } | null; error: AuthError | Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch profile data in a separate function to avoid Supabase deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      setProfile(data as UserProfile);
      
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signIn = async (phone: string, password: string, captchaToken?: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        phone,
        password,
        options: {
          captchaToken: captchaToken
        }
      });
      
      return { error };
    } catch (error: unknown) {
      const authError = error instanceof AuthError ? error : new AuthError(error instanceof Error ? error.message : String(error));
      return { error: authError };
    }
  };

  const signUp = async (phone: string, password: string, userData?: object, captchaToken?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        phone,
        password,
        options: {
          data: userData,
          captchaToken: captchaToken
        }
      });
      
      return { data, error };
    } catch (error: unknown) {
      const authError = error instanceof AuthError ? error : new AuthError(error instanceof Error ? error.message : String(error));
      return { error: authError };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      isLoading,
      signIn,
      signUp,
      signOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
