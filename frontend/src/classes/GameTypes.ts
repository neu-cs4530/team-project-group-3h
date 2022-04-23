export type GameAction = {
  actionString: string;
  playerID: string;
  team: number;
};

export type GameState = {
  teamOneState: TeamState | undefined;
  teamTwoState: TeamState | undefined;
  winner: string;
  isActive: boolean;
};

export type TeamState = {
  teamMembers: string[];
  guesses: string[];
  attemptsLeft?: number;
};

export type GameType = 'wordle' | 'tictactoe';