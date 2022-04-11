import fs from 'fs';
import wordListPath from 'word-list';

/**
 * Class to handle the logic of a wordle game
 */
export default class WordHandler {
    private _wordList: string[];
    private _targetWord: string = '';
    private _wordMap: Map<string, number> = new Map;
    private _wordLength: number;
    private _correctAnswerList: number[] = [];

    /**
     * Constructor for WordHandler
     * @param starterWord Optional starter word argument for testing
     * @param length Length of wordle words
     */
    constructor(starterWord?: string, length: number = 5) {
        this._wordList = fs.readFileSync(wordListPath, 'utf8').split('\n').filter((word: string) => word.length === length);
        starterWord? this._targetWord = starterWord : this.randomizer();
        this._targetWord = this._targetWord.toLocaleLowerCase();
        this.fillMap(this._targetWord, this._wordMap);
        this._wordLength = length;
        for (let i = 0; i < this._wordLength; i += 1) this._correctAnswerList.push(1)
    }
    
    /**
     * Fills a map with each letter in the word and the count of it
     * @param word the word we are letter mapping
     * @param map map object that is being populated
     */
    fillMap(word: string, map: Map<string, number>) {
        for (let i = 0; i < word.length; i += 1) {
            const currentChar = word[i];
            if (map.has(currentChar)) {
                const currentMapValue = map.get(currentChar);
                map.set(currentChar, (currentMapValue || 0) +1);
            }
            else {
                map.set(currentChar, 1)
            }
        }
    }

    /**
     * Sets the target word to a random word in the dictionary
     */
    public randomizer(): void {
        let i = Math.floor(Math.random()*this._wordList.length);
        this._targetWord = this._wordList[i];
    }

    public get wordList(): string[] {
        return this._wordList;
    }

    public  get targetWord(): string {
        return this._targetWord;
    }

    /**
     * Handles a wordle game guess
     * @param guess the word the player is guessing
     * @returns a number array indicating whether each letter is in the right position. 
     * -1 is the letter is in the word but wrong position, 1 if in the word and right position, 0 if not in word
     * @throws error if guess is too short, too long, or not an actual word
     */
    handleGuess(guess: string): number[] {
        const guessLowerCase = guess.toLowerCase();
        if (this._wordList.indexOf(guessLowerCase) === -1) throw new Error("Invalid Word");
        if (guessLowerCase === this._targetWord) return this._correctAnswerList;
        
        const guessResult: number[] = [];
        for (let i = 0; i < this._wordLength; i += 1) {
            guessResult.push(0);
        }
        const lettersSeenSoFar: Map<string, number> = new Map;

        for (let i = 0; i < guess.length; i += 1) {
            const currentLetter = guessLowerCase[i];
            const targetLetter = this._targetWord[i];
            if(currentLetter === targetLetter) {
                const currentMapValue = lettersSeenSoFar.get(currentLetter);
                lettersSeenSoFar.set(currentLetter, (currentMapValue || 0) +1);
                guessResult[i] = 1;
            } 
        }
        for (let i = 0; i < guess.length; i += 1) {
            const currentLetter = guessLowerCase[i];
            const targetLetter = this._targetWord[i];
            if (this._wordMap.has(currentLetter) && 
            (lettersSeenSoFar.get(currentLetter) || 0) < (this._wordMap.get(currentLetter) || 0)
            && currentLetter !== targetLetter) {
                const currentMapValue = lettersSeenSoFar.get(currentLetter);
                lettersSeenSoFar.set(currentLetter, (currentMapValue || 0) +1);
                guessResult[i] = -1;
            }
        }
        return guessResult;
    }
}