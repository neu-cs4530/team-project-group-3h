import React, { useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import GameBoard from './GameBoard';
import WordleLobby from './WordleLobby';

export default function GameWindow(): JSX.Element {
    // will need to use the model hook to access the state of the game (game list vs lobby vs game play vs game over)
    // don't hard code width
    const [state, setState] = useState('list');

    if (state === 'list') {
        return (
            <VStack width='250px' align='center'>
                <Text fontSize='lg'>Choose a game to play!</Text>
                <Button onClick={() => setState('lobby')} colorScheme='blue' size='md'>Wordle</Button>
                <Button onClick={() => window.open("https://sudoku.com/")} colorScheme='blue' size='md'>Sudoku</Button>
                <Button onClick={() => window.open("https://www.washingtonpost.com/crossword-puzzles/daily/")} colorScheme='blue' size='md'>Daily Crossword</Button>
                <Button onClick={() => window.open("https://playtictactoe.org/")} colorScheme='blue' size='md'>Tic Tac Toe</Button>
            </VStack>
        );
    }
    return <Box><GameBoard /></Box>;
};