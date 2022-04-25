import { GameAction, GameState } from './GameTypes';
import type Player from './Player';

export default interface IGame {
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
  addPlayerToTeam(playerID: string, teamToJoin: number): void;

  /**
     * Removes a player from the Game
     * @param playerID 
     */
  removePlayer(playerID: string): void;

  /**
     * Inputs an Action
     * @param action 
     */
  inputAction(action: GameAction): boolean;

  /**
     * Returns the Game State
     */
  getState(): GameState;
}