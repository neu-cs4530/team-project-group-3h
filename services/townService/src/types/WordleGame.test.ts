import WordleGame from './WordleGame';

describe('it should test the wordle game model class', () => {
  let model: WordleGame;
   
  beforeEach(() => {
    model = new WordleGame();
  });

  it('should have a title of Wordle', () => {
    expect(model.title).toStrictEqual('Wordle'); 
  });
});