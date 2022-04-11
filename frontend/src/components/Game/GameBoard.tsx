import { Box, Button, Stack, VStack, Text, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';

type GuessInformation = {
  guessArray: string[],
  letterColors: number[] // 1 for green, 0 for grey, -1 for yellow
}

type WordleRowProps = {
  guessArray: string[],
  letterColors: number[], // 1 for green, 0 for grey, -1 for yellow
  showLetters: boolean
}

type WordleLetterProps = {
  letter: string,
  color: number
}

type AllRowsProps = {
  guessRows: JSX.Element[]
}

/**
 * A button representing a guessed letter as part of a wordle row, with the correct color (gray, green, or yellow)
 * @param props the letter to display and its color 
 * @returns JSX.Element representing one guessed letter
 */
function WordleLetter(props: WordleLetterProps): JSX.Element {
  const {letter, color} = props;

  if (color === 0) {
    return <Button size='sm' colorScheme='gray'>{letter}</Button>
  }
  if (color === 1) {
    return <Button size='sm' colorScheme='green'>{letter}</Button>
  } 
  return <Button size='sm' colorScheme='yellow'>{letter}</Button>
}

/**
 * Constructs one guessed row of the Wordle Game, with letters and colors or partial information
 * @param props the guess to display and its corresponding color information for each letter, as well as a boolean telling us whether to show full or partial information
 * @returns JSX.Element representing an entire guessed wordle row
 */
function WordleRow(props: WordleRowProps): JSX.Element {
    const {guessArray, letterColors, showLetters} = props; 

    return(
        <HStack spacing='12px'>
          <WordleLetter letter={(showLetters) ? guessArray[0] : ''} color={letterColors[0]}/>
          <WordleLetter letter={(showLetters) ? guessArray[1] : ''} color={letterColors[1]}/>
          <WordleLetter letter={(showLetters) ? guessArray[2] : ''} color={letterColors[2]}/>
          <WordleLetter letter={(showLetters) ? guessArray[3] : ''} color={letterColors[3]}/>
          <WordleLetter letter={(showLetters) ? guessArray[4] : ''} color={letterColors[4]}/>
      </HStack>
    );
}

/**
 * Returns a blank, unguessed row
 * @returns JSX.Element representing a blank, unguessed row
 */
function BlankRow(): JSX.Element {
  return(
      <HStack spacing='12px'>
        <Button size='sm' variant='outline'/>
        <Button size='sm' variant='outline'/>
        <Button size='sm' variant='outline'/>
        <Button size='sm' variant='outline'/>
        <Button size='sm' variant='outline'/>
    </HStack>
  );
}

/**
 * All the rows for a particular team's board, consisting of their guessed rows with correct colors, as well as remaining unguessed rows
 * @param props the rows representing words the team has guessed
 * @returns JSX.Element of the entire team's board
 */
function AllRows(props: AllRowsProps) : JSX.Element {
  const {guessRows} = props;

  return(
    <VStack>
      {(guessRows.length > 0) ? guessRows[0] : <BlankRow/>}
      {(guessRows.length > 1) ? guessRows[1] : <BlankRow/>}
      {(guessRows.length > 2) ? guessRows[2] : <BlankRow/>}
      {(guessRows.length > 3) ? guessRows[3] : <BlankRow/>}
      {(guessRows.length > 4) ? guessRows[4] : <BlankRow/>}
      {(guessRows.length > 5) ? guessRows[5] : <BlankRow/>}
    </VStack>
  );
}


/**
 * Should show the game board and its current state to both spectators and game players. Should also show a Wordle title bar,
 * the player's state, and an input tab for players to input guesses when it is their team's turn.
 * 
 * IN PROGRESS
 *
 */
export default function GameBoard(): JSX.Element {
  const [team, setTeam] = useState('red');

  const redGuesses : GuessInformation[] = [{guessArray: ['t', 'r', 'a', 'c', 'e'], letterColors: [0, 0, 1, 0, 0]}, {guessArray: ['h', 'e', 'l', 'l', 'o'], letterColors: [-1, 0, -1, 0, 0]}];
  const blueGuesses : GuessInformation[] = [{guessArray: ['h', 'e', 'l', 'l', 'o'], letterColors: [-1, 0, -1, 0, 0]}];
  
  const yourTeamHeader = (team === 'none') ? 'You are Spectating!' : `You are ${  team  }!`;

  const redRows = redGuesses.map((guess, index) => 
  <WordleRow key={index.toString()} guessArray={guess.guessArray} letterColors={guess.letterColors} showLetters={team === 'red'}/>);

  const blueRows = blueGuesses.map((guess, index) => 
  <WordleRow key={index.toString()} guessArray={guess.guessArray} letterColors={guess.letterColors} showLetters={team === 'blue'}/>);

  const redBoard = <AllRows guessRows={redRows}/>;
  const blueBoard = <AllRows guessRows={blueRows}/>;

  return (
    <VStack padding={4} align='center'>
      <Text fontSize='xl'>Wordle</Text>
      <HStack spacing='24px'>
        <VStack>
          {redBoard}
          <Text fontSize='sm'>Red Teams Board</Text>
        </VStack>
        <VStack>
          {blueBoard}
          <Text fontSize='sm'>Blue Teams Board</Text>
        </VStack>
      </HStack>
      <Text fontSize='lg'>{yourTeamHeader}</Text>
    </VStack>
  );
}