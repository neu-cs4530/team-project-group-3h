import { GameAction, GameState, TeamState } from "../CoveyTypes";
import IGame from "./IGame";
import Player from "./Player";
import WordHandler from "./WordHandler";

export default class WordleGame implements IGame {

    private active: boolean;

    private wordHandler: WordHandler;

    private team1: string[];

    private teamOneGuesses: string[];

    private team2: string[];

    private teamTwoGuesses: string[];

    private winner: string | undefined;

    constructor() {
        this.active = false;
        this.team1 = [];
        this.team2 = [];

        this.teamOneGuesses = [];
        this.teamTwoGuesses = [];
        this.wordHandler = new WordHandler();
    }
    playGame(): void {
        throw new Error("Method not implemented.");
    }

    setSessionActive(isSessionStarted: boolean): void {
        throw new Error("Method not implemented.");
    }
    
    addPlayerToTeam(player: Player, teamToJoin: number): void {
        if (teamToJoin !== 1 && teamToJoin !== 2) {
            throw new Error("Invalid team");
        }
        const teamArray: string[] = (teamToJoin === 1)? this.team2 : this.team2;
        teamArray.push(player.id);
    }
    
    removePlayer(playerID: string): void {
        throw new Error("Method not implemented.");
    }
    gameActive(isGameStarted: boolean): void {
        throw new Error("Method not implemented.");
    }
    inputAction(action: GameAction): boolean {
        throw new Error("Method not implemented.");
    }
    getState(): GameState {
        const team1State: TeamState = {
            teamMembers: this.team1.map((player) => player),
            guesses: this.teamOneGuesses.map((guess) => guess),
        };
        const team2State: TeamState = {
            teamMembers: this.team2.map((player) => player),
            guesses: this.teamTwoGuesses.map((guess) => guess),
        };
        const gameState: GameState = {
            teamOneState: team1State,
            teamTwoState: team2State,
            winner: this.winner ? this.winner : " ",
            isActive: this.active
        };
        return gameState;
        //throw new Error("Method not implemented.");
    }

}