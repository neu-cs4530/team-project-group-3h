import { GameAction, GameState, Guess, TeamState } from '../CoveyTypes';
import IGame from './IGame';
import Player from './Player';
import WordHandler from './WordHandler';

export default class WordleGame implements IGame {

  private readonly _title = 'Wordle';

  private winner: string | undefined;
  
  private active: boolean;

  private enabled: boolean;

  private wordHandler: WordHandler;

  private blueTeam: string[];

  private blueGuesses: Guess[];

  private redTeam: string[];

  private redGuesses: Guess[];


  constructor() {
    this.enabled = false;
    this.active = false;
    this.blueTeam = [];
    this.redTeam = [];

    this.blueGuesses = [];
    this.redGuesses = [];
    this.wordHandler = new WordHandler();
  }

  setSessionActive(isSessionStarted: boolean): void {
    // throw new Error("Method not implemented.");
    this.enabled = isSessionStarted;
  }
    
  addPlayerToTeam(player: Player, teamToJoin: number): void {
    if (teamToJoin !== 1 && teamToJoin !== 2) {
      throw new Error('Invalid team');
    }
    const playerID: string = player.id;
    if ((this.blueTeam.indexOf(playerID) !== -1) && (this.redTeam.indexOf(playerID) !== -1)) throw new Error('Player in both teams');
    if ((this.blueTeam.indexOf(playerID) !== -1) || (this.redTeam.indexOf(playerID) !== -1)) this.removePlayer(playerID);
    const teamArray: string[] = (teamToJoin === 1) ? this.redTeam : this.redTeam;
    teamArray.push(player.id); // error vs boolean    
  }
    

  removePlayer(playerID: string): void {
    this.blueTeam.filter((player) => player !== playerID);
    this.redTeam.filter((player) => player !== playerID);
  }
    
  gameActive(isGameStarted: boolean): void {
    this.active = isGameStarted;
  }
    
  inputAction(action: GameAction): boolean {
    if (this.redTeam.indexOf(action.playerID) === -1 && this.blueTeam.indexOf(action.playerID) === -1) return false;
    if (this.redTeam.indexOf(action.playerID) !== -1 && this.blueTeam.indexOf(action.playerID) !== -1) return false;

    try {
      const teamToAddGuessTo: Guess[] = (this.blueTeam.indexOf(action.playerID) !== -1) ? this.blueGuesses : this.redGuesses;
      const guessArray: number[] = this.wordHandler.handleGuess(action.actionString);
      const playerGuess: Guess = { word: action.actionString, guessResult: guessArray };
      teamToAddGuessTo.push(playerGuess);
      return true;
    } catch (e: any) {
      return false;
    }
  }

  getState(): GameState {
    const blueTeamState: TeamState = {
      teamMembers: this.blueTeam.map((player) => player),
      guesses: this.blueGuesses.map((guess) => guess.word),
    };
    const redTeamState: TeamState = {
      teamMembers: this.redTeam.map((player) => player),
      guesses: this.redGuesses.map((guess) => guess.word),
    };
    const gameState: GameState = {
      teamOneState: blueTeamState,
      teamTwoState: redTeamState,
      winner: this.winner ? this.winner : ' ',
      isActive: this.active,
    };
    return gameState;
  }

  public get title() : string {
    return this._title;
  }
}