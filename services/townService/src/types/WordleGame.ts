import { GameAction, GameState } from "../CoveyTypes";
import IGame from "./IGame";
import Player from "./Player";

export default class WordleGame implements IGame {

    private active: boolean;

    private team1: string[];

    private teamOneGuesses: string[];

    private team2: string[];

    private teamTwoGuesses: string[];

    private winner?: string;

    constructor() {
        this.active = false;
        this.team1 = [];
        this.team2 = [];

        this.teamOneGuesses = [];
        this.teamTwoGuesses = [];
    }

    setSessionActive(isSessionStarted: boolean): void {
        throw new Error("Method not implemented.");
    }
    addPlayerToTeam(player: Player, teamToJoin: number): void {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }

}