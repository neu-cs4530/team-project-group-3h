export type Direction = 'front' | 'back' | 'left' | 'right';
export type UserLocation = {
  x: number;
  y: number;
  rotation: Direction;
  moving: boolean;
  conversationLabel?: string;
};
export type CoveyTownList = { friendlyName: string; coveyTownID: string; currentOccupancy: number; maximumOccupancy: number }[];

export type ChatMessage = {
  author: string;
  sid: string;
  body: string;
  dateCreated: Date;
};

export type GameAction = {
  actionString: string;
  playerID: string;
  // team: number;
};

export type GameState = {
  teamOneState: TeamState | undefined;
  teamTwoState: TeamState | undefined;
  winner: string;
  isActive: boolean;
};

export type GameType = 'wordle' | 'tictactoe';

export type TeamState = {
  teamMembers: string[];
  guesses: Guess[];
  attemptsLeft?: number;
};

export type Guess = {
  word: string;
  guessResult: number[];
};