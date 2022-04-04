import WordHandler from './WordList';

describe('Should test WordHandler class', () => {
    it('should return a 5 letter word', () => {
        const testWordHandler: WordHandler = new WordHandler();
        console.log(testWordHandler.wordList);
        console.log(testWordHandler.targetWord);
        expect(testWordHandler.wordList[0].length).toBe(5);
        expect(testWordHandler.targetWord.length).toBe(5);
    });
});