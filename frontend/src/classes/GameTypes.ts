export type GameAction = {
  actionString: string;
  playerID: string;
  team: number;
};

export type GameState = {
  teamOneState: TeamState;
  teamTwoState: TeamState;
  // teams: Map<String, TeamState>;
  winner: string;
  isActive: boolean;
};

export type TeamState = {
  teamMembers: string[];
  guesses: string[];
  attemptsLeft?: number;
};