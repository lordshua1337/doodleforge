"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createSupabaseBrowser } from "@/lib/auth/client";
import type { User } from "@supabase/supabase-js";

type SessionContextValue = {
  readonly user: User | null;
  readonly credits: number;
  readonly loading: boolean;
  readonly signOut: () => Promise<void>;
  readonly refreshCredits: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { readonly children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  const supabase = createSupabaseBrowser();

  const fetchCredits = useCallback(async (_userId?: string) => {
    try {
      const res = await fetch("/api/credits");
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits ?? 0);
      }
    } catch {
      // Credits fetch failed -- not critical, keep going
    }
  }, []);

  const refreshCredits = useCallback(async () => {
    if (user) {
      await fetchCredits(user.id);
    }
  }, [user, fetchCredits]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchCredits(currentUser.id);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchCredits(currentUser.id);
      } else {
        setCredits(0);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCredits(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SessionContext.Provider value={{ user, credits, loading, signOut, refreshCredits }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
}
