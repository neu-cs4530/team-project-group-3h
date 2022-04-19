import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import GameBoard from './GameBoard';
import WordleLobby from './WordleLobby';
import ConversationArea, { NO_TOPIC_STRING } from '../../classes/ConversationArea';
import useGameState from '../../hooks/useGameState';

/**
 * A Game Window that is rendered when a player is in an active conversation area. Associated with a particular conversation area,
 * and shows a list of games the player can choose to play.
 * @returns A JSX.Element representing a Game Window when there is an active conversation area
 */
export default function GameWindow(): JSX.Element {
    const {gameConversationArea} = useGameState();
    const [currentPhase, setCurrentPhase] = useState<string | undefined>(undefined);

    // if the player is not in an active conversation, show nothing
    if (!gameConversationArea || gameConversationArea?.topic === NO_TOPIC_STRING) {
        return <Box> </Box>
    }
    // if game started, show that
    switch (currentPhase) {
        case 'list': {
            return (
                <VStack align='center'>
                    <Text fontSize='lg'>Choose a game to play!</Text>
                    <Button onClick={() => setCurrentPhase('lobby')} colorScheme='blue' size='md'>Wordle</Button>
                    <Button onClick={() => window.open("https://sudoku.com/")} colorScheme='blue' size='md'>Sudoku</Button>
                    <Button onClick={() => window.open("https://www.washingtonpost.com/crossword-puzzles/daily/")} colorScheme='blue' size='md'>Daily Crossword</Button>
                    <Button onClick={() => window.open("https://playtictactoe.org/")} colorScheme='blue' size='md'>Tic Tac Toe</Button>
                </VStack>
            );
        }
        case 'lobby' : {
            return <VStack align='center'>
                <WordleLobby />
                <Button onClick={() => setCurrentPhase('game')} colorScheme='green' size='sm'>Start Game</Button>
            </VStack>
        }
        case 'game' : {
            return <VStack align='center'>
                <GameBoard gameover={false}/>
                <Button onClick={() => setCurrentPhase('gameover')} colorScheme='green' size='sm'>End Game</Button>
            </VStack>
        }
        case 'gameover' : {
            return <GameBoard gameover/>
        }
        default : {
            return <div />
        }
    }
};