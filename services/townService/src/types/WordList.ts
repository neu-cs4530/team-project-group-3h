const fs = require('fs');
const wordListPath = require('word-list');

export default class WordHandler {
    private _wordList: string[];
    private _targetWord: string;

    constructor() {
        this._wordList = fs.readFileSync(wordListPath, 'utf8').split('\n').filter((word: string) => word.length === 5);
        this._targetWord = 'wordl';
        this.randomizer();
    }

    public randomizer(): void {
        let i = Math.floor(Math.random()*this._wordList.length);
        console.log(i);
        this._targetWord = this._wordList[i];
    }

    public get wordList(): string[] {
        return this._wordList;
    }

    public  get targetWord(): string {
        return this._targetWord;
    }
}