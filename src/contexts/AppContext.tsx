import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Competition, Team, Match, User } from '../types';

interface AppContextType {
  // User state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Competition state
  competitions: Competition[];
  setCompetitions: (competitions: Competition[]) => void;
  
  // Team state
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  
  // Match state
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  
  // Loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    competitions,
    setCompetitions,
    teams,
    setTeams,
    matches,
    setMatches,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
