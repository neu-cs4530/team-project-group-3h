import WordHandler from './WordHandler';

describe('Should test WordHandler class', () => {
  it('should only have 5 letter words in word list', () => {
    const testWordHandler: WordHandler = new WordHandler();
    testWordHandler.wordList.forEach((word) => expect(word.length).toBe(5));
    expect(testWordHandler.targetWord.length).toBe(5);
  });

  it('should return an error if the guessed word is too short or too long or not a real word', () => {
    const testWordHandler: WordHandler = new WordHandler();
    expect(() => {testWordHandler.handleGuess('bed');}).toThrowError('Invalid Word');
    expect(() => {testWordHandler.handleGuess('result');}).toThrowError('Invalid Word');
    expect(() => {testWordHandler.handleGuess('abcde');}).toThrowError('Invalid Word');
  });

  it('should return an array of length 5 filled with ones if the correct word is guessed', () => {
    const targetWord = 'aloof';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess(targetWord)).toStrictEqual([1, 1, 1, 1, 1]);
  });

  it('should return an array of length 5 filled with zeros if no letter guessed is in the target word', () => {
    const targetWord = 'aloof';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('nymph')).toStrictEqual([0, 0, 0, 0, 0]);
  });

  it('should return an array with two -1s for repeated letters in the wrong position', () => {
    const targetWord = 'cabal';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('arena')).toStrictEqual([-1, 0, 0, 0, -1]);
  });

  it('should return an array with one -1s if guess has repeated letters but target only contains one of that letter', () => {
    const targetWord = 'aloof';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('kayak')).toStrictEqual([0, -1, 0, 0, 0]);
  });

  it('should return an array with one -1 and one 1 if target has double letters but only one guess in correct position', () => {
    const targetWord = 'arena';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('awash')).toStrictEqual([1, 0, -1, 0, 0]);
  });

  it('should return an array with one 1 if guess has repeating letters but target only has one', () => {
    const targetWord = 'pleat';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('sheet')).toStrictEqual([0, 0, 1, 0, 1]);
  });

  it('should be able to make words of varying lengths', () => {
    const targetWord = 'silent';
    const testWordHandler: WordHandler = new WordHandler(targetWord, 6);
    testWordHandler.wordList.forEach((word) => expect(word.length).toBe(6));
    expect(testWordHandler.handleGuess('silent')).toStrictEqual([1, 1, 1, 1, 1, 1]);
  });
    
  it('should return an array of -1s if no letter is in the correct position', () => {
    const targetWord = 'sceat';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('taces')).toStrictEqual([-1, -1, -1, -1, -1]);
  });

  it('should ignore case sensitivity', () => {
    const targetWord = 'THYME';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('thyme')).toStrictEqual([1, 1, 1, 1, 1]);
  });

  it('should ignore case sensitivity', () => {
    const targetWord = 'thyme';
    const testWordHandler: WordHandler = new WordHandler(targetWord);
    expect(testWordHandler.handleGuess('THYME')).toStrictEqual([1, 1, 1, 1, 1]);
  });
});