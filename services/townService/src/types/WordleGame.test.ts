import { GameAction, GameState, Guess, TeamState } from '../CoveyTypes';
import Player from './Player';
import WordleGame from './WordleGame';

describe('Tests pertaining to the WordleGame implementation of IGame', () => {
  let model: WordleGame;
  const player: Player = new Player('test player');
   
  beforeEach(() => {
    model = new WordleGame();
    model.setSessionActive(true);
    model.setAddPlayerEnabled(true);
  });

  it('should have a title of Wordle', () => {
    expect(model.title).toStrictEqual('Wordle'); 
  });

  it('should set session to enabled', () => {
    model.setAddPlayerEnabled(false);
    expect(model.addPlayerToTeam(player.id, 1)).toBe(false);
    model.setAddPlayerEnabled(true);
    expect(model.addPlayerToTeam(player.id, 1)).toBe(true);
  });

  it('should return false if player tries to join invalid team', () => {
    expect(model.addPlayerToTeam(player.id, 0)).toBe(false);
    expect(model.addPlayerToTeam(player.id, 3)).toBe(false);
    expect(model.addPlayerToTeam(player.id, 4)).toBe(false);
  });

  it('should add player to correct team', () => {
    const redTeamState: TeamState | undefined = model.getState().teamOneState;
    if (redTeamState) {
      expect(redTeamState.teamMembers.length).toBe(0);
    }
    expect(model.addPlayerToTeam(player.id, 1)).toBe(true);
    const newRedTeamState: TeamState | undefined = model.getState().teamOneState;
    if (newRedTeamState) {
      expect(newRedTeamState.teamMembers.length).toBe(1);
      expect(newRedTeamState.teamMembers.indexOf(player.id)).toBeGreaterThan(-1);
    }
  });

  it('should remove player from one team and add to other team', () => {
    model.addPlayerToTeam(player.id, 1);
    let modelState = model.getState();
    if (modelState.teamOneState && modelState.teamTwoState) {
      expect(modelState.teamOneState.teamMembers.length).toBe(1);
      expect(modelState.teamOneState.teamMembers.indexOf(player.id)).toBeGreaterThan(-1);
      expect(modelState.teamTwoState.teamMembers.length).toBe(0);
    }
    model.addPlayerToTeam(player.id, 2);
    modelState = model.getState();
    if (modelState.teamOneState && modelState.teamTwoState) {
      expect(modelState.teamTwoState.teamMembers.length).toBe(1);
      expect(modelState.teamTwoState.teamMembers.indexOf(player.id)).toBeGreaterThan(-1);
      expect(modelState.teamOneState.teamMembers.length).toBe(0);
    }
  });

  it('should set active to true in gameState', () => {
    model.setSessionActive(false);
    expect(model.getState().isActive).toBe(false);
    model.setSessionActive(true);
    expect(model.getState().isActive).toBe(true);
  });

  it('should have inputAction return false if the game is not active yet', () => {
    model.setSessionActive(false);
    model.addPlayerToTeam(player.id, 1);
    const guess: GameAction = { actionString: 'court', playerID: player.id };
    expect(model.inputAction(guess)).toBe(false);
    model.setSessionActive(true);
    expect(model.inputAction(guess)).toBe(true);
  });

  it('should return false if player guessing isnt on a team', () => {
    const invalidPlayerGuess: GameAction = { actionString: 'court', playerID: player.id };
    expect(model.inputAction(invalidPlayerGuess)).toBe(false);
  });

  it('should return false if invalid guess', () => {
    model.addPlayerToTeam(player.id, 1);
    const shortGuess: GameAction = { actionString: 'hi', playerID: player.id };
    const longGuess: GameAction = { actionString: 'supreme', playerID: player.id };
    const invalidWordGuess: GameAction = { actionString: 'abcde', playerID: player.id };
    const validGuess: GameAction = { actionString: 'hello', playerID: player.id };
    expect(model.inputAction(shortGuess)).toBe(false);
    expect(model.inputAction(longGuess)).toBe(false);
    expect(model.inputAction(invalidWordGuess)).toBe(false);
    expect(model.inputAction(validGuess)).toBe(true);
  });

  it('should add the guess to the corresponding team', () => {
    model.addPlayerToTeam(player.id, 1);
    let modelState = model.getState();
    if (modelState.teamOneState && modelState.teamTwoState) {
      expect(modelState.teamOneState.teamMembers.length).toBe(1);
      expect(modelState.teamTwoState.teamMembers.length).toBe(0);
      expect(modelState.teamOneState.guesses.length).toBe(0);
      expect(modelState.teamTwoState.guesses.length).toBe(0);
    }
    const validGuess: GameAction = { actionString: 'hello', playerID: player.id };
    model.inputAction(validGuess);
    modelState = model.getState();
    if (modelState.teamOneState && modelState.teamTwoState) {
      expect(modelState.teamOneState.teamMembers.length).toBe(1);
      expect(modelState.teamTwoState.teamMembers.length).toBe(0);
      expect(modelState.teamOneState.guesses.length).toBe(1);
      const firstGuess: Guess = modelState.teamOneState.guesses[0];
      expect(firstGuess.word).toStrictEqual('hello');
      expect(firstGuess.guessResult.length).toStrictEqual(5);
      expect(modelState.teamTwoState.guesses.length).toBe(0);
    }
    
    validGuess.actionString = 'stair';
    model.inputAction(validGuess);
    modelState = model.getState();
    if (modelState.teamOneState && modelState.teamTwoState) {
      expect(modelState.teamOneState.teamMembers.length).toBe(1);
      expect(modelState.teamTwoState.teamMembers.length).toBe(0);
      expect(modelState.teamOneState.guesses.length).toBe(2);
      const firstGuess: Guess = modelState.teamOneState.guesses[0];
      const secondGuess: Guess = modelState.teamOneState.guesses[1];
      expect(firstGuess.word).toStrictEqual('hello');
      expect(secondGuess.word).toStrictEqual('stair');
      expect(firstGuess.guessResult.length).toStrictEqual(5);
      expect(secondGuess.guessResult.length).toStrictEqual(5);
      expect(modelState.teamTwoState.guesses.length).toBe(0);
    }
   
    const player2: Player = new Player('Another test player');
    model.addPlayerToTeam(player2.id, 2);
    validGuess.playerID = player2.id;
    validGuess.actionString = 'stave';
    model.inputAction(validGuess);
    modelState = model.getState();
    if (modelState.teamOneState && modelState.teamTwoState) {
      expect(modelState.teamOneState.teamMembers.length).toBe(1);
      expect(modelState.teamTwoState.teamMembers.length).toBe(1);
      expect(modelState.teamOneState.guesses.length).toBe(2);
      const firstGuess: Guess = modelState.teamOneState.guesses[0];
      const secondGuess: Guess = modelState.teamOneState.guesses[1];
      expect(firstGuess.word).toStrictEqual('hello');
      expect(secondGuess.word).toStrictEqual('stair');
      expect(firstGuess.guessResult.length).toStrictEqual(5);
      expect(secondGuess.guessResult.length).toStrictEqual(5);
      expect(modelState.teamTwoState.guesses.length).toBe(1);
      const thirdGuess: Guess = modelState.teamTwoState.guesses[0];
      expect(thirdGuess.word).toStrictEqual('stave');
      expect(thirdGuess.guessResult.length).toStrictEqual(5);
    }
  });

  it('should return the correct game state', () => {
    const player2: Player = new Player('Another test player');
    const redTeamState: TeamState = { teamMembers: [], guesses: [] };
    const blueTeamState: TeamState = { teamMembers: [], guesses: [] };
    const currentGameState: GameState = {
      teamOneState: redTeamState,
      teamTwoState: blueTeamState, 
      winner: ' ',
      isActive: true,
      isEnabled: true,
    };
    expect(model.getState()).toStrictEqual(currentGameState);
    model.addPlayerToTeam(player.id, 1);
    redTeamState.teamMembers.push(player.id);
    expect(model.getState()).toStrictEqual(currentGameState);
    model.addPlayerToTeam(player2.id, 2);
    blueTeamState.teamMembers.push(player2.id);
    expect(model.getState()).toStrictEqual(currentGameState);
    model.setSessionActive(false);
    currentGameState.isActive = false;
    expect(model.getState()).toStrictEqual(currentGameState);
    model.removePlayer(player.id);
    redTeamState.teamMembers.pop();
    expect(model.getState()).toStrictEqual(currentGameState);
    model.setSessionActive(true);
    const validGuess: GameAction = { actionString: 'nymph', playerID: player2.id };
    model.inputAction(validGuess);
    const modelState = model.getState();
    if (modelState.teamOneState && modelState.teamTwoState) {
      const team1Guesses: Guess[] = modelState.teamOneState.guesses; 
      const team2Guesses: Guess[] = modelState.teamTwoState.guesses; 
      expect(team1Guesses.length).toBe(0);
      expect(team2Guesses.length).toBe(1);
      expect(team2Guesses[0].word).toStrictEqual('nymph');
    }

  });
});