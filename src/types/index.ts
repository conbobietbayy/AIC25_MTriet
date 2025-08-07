// Types cho VBS Competition
export interface Competition {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Team {
  id: string;
  name: string;
  members: Player[];
  score: number;
}

export interface Player {
  id: string;
  name: string;
  email: string;
  teamId?: string;
}

export interface Match {
  id: string;
  competitionId: string;
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  date: Date;
  status: 'scheduled' | 'ongoing' | 'completed';
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'player' | 'viewer';
}
