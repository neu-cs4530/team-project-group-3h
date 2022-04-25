import { GameAction, GameState } from '../CoveyTypes';

export default interface IGame {
  /**
     * Activates/Deactivates a Game Session. Can only add inputs if session has started
     * @param isSessionStarted 
     */
  setSessionActive(isSessionStarted: boolean): void;

  /**
   * Enables a Wordle Game to allow player editing. Can add or remove players once canAddPlayers is true
   * @param canAddPlayers 
   */
  setAddPlayerEnabled(canAddPlayers: boolean): void;

  /**
     * Adds a player to a Game Team
     * @param player 
     * @param teamToJoin 
     */
  addPlayerToTeam(player: string, teamToJoin: number): boolean;

  /**
     * Removes a player from the Game
     * @param playerID 
     */
  removePlayer(playerID: string): boolean;

  /**
     * Starts or stops the game
     * @param isGameStarted 
     */
  // gameActive(isGameStarted: boolean): void;

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