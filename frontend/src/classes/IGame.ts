import { GameAction, GameState } from './GameTypes';
import type Player from './Player';

export default interface IGame {

  /**
    * Returns the title of the game
    */
  getTitle(): string;

  /**
     * Activates/Deactivates a Game Session
     * @param isSessionStarted 
     */
  setSessionActive(isSessionStarted: boolean): void;

  /**
     * Adds a player to a Game Team
     * @param player 
     * @param teamToJoin 
     */
  addPlayerToTeam(player: Player, teamToJoin: number): void;

  /**
     * Removes a player from the Game
     * @param playerID 
     */
  removePlayer(playerID: string): void;

  /**
     * Starts or stops the game
     * @param isGameStarted 
     */
  gameActive(isGameStarted: boolean): void;

  /**
     * Inputs an Action
     * @param action 
     */
  inputAction(action: GameAction): boolean;

  /**
     * Returns the Game State
     */
  getState(): GameState;

  /**
     * Starts the current Game
     */
  playGame(): void;
}