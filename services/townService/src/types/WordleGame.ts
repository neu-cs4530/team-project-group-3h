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

  setSessionActive(isGameStarted: boolean): void {
    this.active = isGameStarted;
  }

  setAddPlayerEnabled(canAddPlayers: boolean): void {
    this.enabled = canAddPlayers;
  }
    
  addPlayerToTeam(playerID: string, teamToJoin: number): boolean {
    console.log(`Player ID within model: ${playerID}`);
    // 1 maps to red team, 2 to blue
    if (teamToJoin !== 1 && teamToJoin !== 2) return false;
    if (!this.enabled) return false; 

    // const playerID: string = player.id;
    if ((this.blueTeam.indexOf(playerID) !== -1) && (this.redTeam.indexOf(playerID) !== -1)) return false;
    if ((this.blueTeam.indexOf(playerID) !== -1) || (this.redTeam.indexOf(playerID) !== -1)) {
      this.removePlayer(playerID);
    }
    const teamArray: string[] = (teamToJoin === 1) ? this.redTeam : this.blueTeam;
    teamArray.push(playerID); // error vs boolean   
    console.log(`Player ID: ${playerID}`); 
    console.log(`Team to join: ${teamToJoin}`); 
    console.log(`Team array after pushing: ${teamArray}`);
    console.log(`Blue team: ${this.blueTeam}`);
    console.log(`Red team: ${this.redTeam}`);
    return true;
  }
    

  removePlayer(playerID: string): boolean {
    if (!this.enabled) return false;
    let bSize = this.blueTeam.length;
    let rSize = this.redTeam.length;
    this.blueTeam = this.blueTeam.filter((player) => player !== playerID);
    this.redTeam = this.redTeam.filter((player) => player !== playerID);
    return (bSize != this.blueTeam.length || rSize != this.redTeam.length);
  }
    
  /*
  gameActive(isGameStarted: boolean): void {
    this.active = isGameStarted;
  }
  */
    
  inputAction(action: GameAction): boolean {
    if (this.redTeam.indexOf(action.playerID) === -1 && this.blueTeam.indexOf(action.playerID) === -1) return false;
    if (this.redTeam.indexOf(action.playerID) !== -1 && this.blueTeam.indexOf(action.playerID) !== -1) return false;
    if (!this.active) return false;

    try {
      const teamToAddGuessTo: Guess[] = (this.blueTeam.indexOf(action.playerID) !== -1) ? this.blueGuesses : this.redGuesses;
      const guessArray: number[] = this.wordHandler.handleGuess(action.actionString);
      const playerGuess: Guess = { word: action.actionString, guessResult: guessArray };
      teamToAddGuessTo.push(playerGuess);
      return true;
    } catch (error) {
      return false;
    }
  }

  getState(): GameState {
    const blueTeamState: TeamState = {
      teamMembers: this.blueTeam.map((player) => player),
      guesses: this.blueGuesses.map((guess) => guess),
    };
    const redTeamState: TeamState = {
      teamMembers: this.redTeam.map((player) => player),
      guesses: this.redGuesses.map((guess) => guess),
    };
    const gameState: GameState = {
      teamOneState: redTeamState,
      teamTwoState: blueTeamState,
      winner: this.winner ? this.winner : ' ',
      isActive: this.active,
      isEnabled: this.enabled,
    };
    return gameState;
  }

  public get title() : string {
    return this._title;
  }
}