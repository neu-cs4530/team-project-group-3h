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
  isEnabled: boolean;
};

export type GameType = "wordle";

export type TeamState = {
  teamMembers: string[];
  guesses: Guess[];
  attemptsLeft?: number;
};

export type Guess = {
  word: string;
  guessResult: number[];
};
