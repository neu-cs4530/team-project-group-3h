import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import GameBoard from './GameBoard';
import WordleLobby from './WordleLobby';
import ConversationArea, { NO_TOPIC_STRING } from '../../classes/ConversationArea';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import usePlayerConversationArea from '../../hooks/usePlayerConversationArea';

/**
 * A Game Window that is rendered when a player is in an active conversation area. Associated with a particular conversation area,
 * and shows a list of games the player can choose to play.
 * @returns A JSX.Element representing a Game Window when there is an active conversation area
 */
export default function GameWindow(): JSX.Element {
    const { apiClient, sessionToken, currentTownID } = useCoveyAppState();
    const currentConversationArea = usePlayerConversationArea();
    const [currentPhase, setCurrentPhase] = useState('list');

    useEffect(() => {
        setCurrentPhase('list');
    }, [currentConversationArea]);

    async function handleWordleClick(convoArea : ConversationArea) {
        try {
            await apiClient.createGame({ coveyTownID: currentTownID, sessionToken, conversationAreaLabel: convoArea.label, gameID: "wordle" });
        }
        catch(err) {
            console.error(err);
        }
        setCurrentPhase('lobby');
    }

    // if the player is in an active conversation area, we want to display our game window
    if (currentConversationArea && currentConversationArea?.topic !== NO_TOPIC_STRING) {
        console.log(currentConversationArea);
        switch (currentPhase) {
            case 'list': {
                return (
                    <VStack align='center'>
                        <Text fontSize='lg'>Choose a game to play!</Text>
                        <Button onClick={() => handleWordleClick(currentConversationArea)} colorScheme='blue' size='md'>Wordle</Button>
                        <Button onClick={() => window.open("https://sudoku.com/")} colorScheme='blue' size='md'>Sudoku</Button>
                        <Button onClick={() => window.open("https://www.washingtonpost.com/crossword-puzzles/daily/")} colorScheme='blue' size='md'>Daily Crossword</Button>
                        <Button onClick={() => window.open("https://playtictactoe.org/")} colorScheme='blue' size='md'>Tic Tac Toe</Button>
                    </VStack>
                );
            }
            case 'lobby': {
                return <VStack align='center'>
                    <WordleLobby />
                    <Button onClick={() => setCurrentPhase('game')} colorScheme='green' size='sm'>Start Game</Button>
                </VStack>
            }
            case 'game': {
                return <VStack align='center'>
                    <GameBoard gameover={false} />
                    <Button onClick={() => setCurrentPhase('gameover')} colorScheme='green' size='sm'>End Game</Button>
                </VStack>
            }
            case 'gameover': {
                return <GameBoard gameover />
            }
            default: {
                return <div />
            }
        }
    }
    // otherwise, do not show the game window
    return <Box />;
};