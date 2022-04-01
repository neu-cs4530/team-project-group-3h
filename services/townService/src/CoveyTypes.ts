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
  team: number;
}

export type GameState = {
  teamOneState: TeamState;
  teamTwoState: TeamState;
  //teams: Map<String, TeamState>;
  winner: string;
  isActive: boolean;
}

export type TeamState = {
  teamMembers: string[];
  guesses: string[];
  attemptsLeft?: number;
}