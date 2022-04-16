import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import GameBoard from './GameBoard';
import WordleLobby from './WordleLobby';
import usePlayerMovement from '../../hooks/usePlayerMovement';
import ConversationArea, { NO_TOPIC_STRING } from '../../classes/ConversationArea';
import { ServerPlayer } from '../../classes/Player';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useConversationAreas from '../../hooks/useConversationAreas';
import IGame from '../../classes/IGame'

/**
 * A Game Window that is rendered when a player is in an active conversation area. Associated with a particular conversation area,
 * and shows a list of games the player can choose to play.
 * @returns A JSX.Element representing a Game Window when there is an active conversation area
 */
export default function GameWindow(): JSX.Element {
    // need to tell back end state has changed!
    const [playerID] = useState(useCoveyAppState().myPlayerID);
    const conversationAreas = useConversationAreas();
    const [currentConversationArea, setCurrentConversationArea] = useState<ConversationArea | undefined>(undefined);
    const [currentGame, setCurrentGame] = useState<IGame | undefined>(undefined);
    const [currentState, setCurrentState] = useState<string | undefined>(undefined);

    const playerMovementCallbacks = usePlayerMovement();

    // listens for player movement events. If the player has moved convos, update currentConversationArea
    useEffect(() => {
        const movementDispatcher = (player: ServerPlayer) => {
            if (player._id === playerID && player.location.conversationLabel !== currentConversationArea?.label) {
                setCurrentConversationArea(conversationAreas.find((area : ConversationArea) => area.label === player.location.conversationLabel));
            }
        };
        playerMovementCallbacks.push(movementDispatcher);
        return () => {
            playerMovementCallbacks.splice(playerMovementCallbacks.indexOf(movementDispatcher), 1);
        };
    }, [playerMovementCallbacks, conversationAreas, currentConversationArea?.label, playerID]);



    // if currentGame's state has changed, rerender
    useEffect(() => {
    }, [currentState]);

    // if currentGame has changed, rerender
    useEffect(() => {
        if(!currentConversationArea) {
            setCurrentState(undefined);
        }
        if (!currentGame) {
            setCurrentState('list');
        }
        else {
            setCurrentState('lobby');
        }
    }, [currentGame, currentConversationArea]);

    // if currentConversationArea has changed, set currentGame
    useEffect(() => {
        setCurrentGame(currentConversationArea?.game);
    }, [currentConversationArea]);


    // if the player is not in an active conversation, show nothing
    if (!currentConversationArea || currentConversationArea?.topic === NO_TOPIC_STRING) {
        return <Box> </Box>
    }
    // if game started, show that
    switch (currentState) {
        case 'list': {
            return (
                <VStack align='center'>
                    <Text fontSize='lg'>Choose a game to play!</Text>
                    <Button onClick={() => setCurrentState('lobby')} colorScheme='blue' size='md'>Wordle</Button>
                    <Button onClick={() => window.open("https://sudoku.com/")} colorScheme='blue' size='md'>Sudoku</Button>
                    <Button onClick={() => window.open("https://www.washingtonpost.com/crossword-puzzles/daily/")} colorScheme='blue' size='md'>Daily Crossword</Button>
                    <Button onClick={() => window.open("https://playtictactoe.org/")} colorScheme='blue' size='md'>Tic Tac Toe</Button>
                </VStack>
            );
        }
        case 'lobby' : {
            return <VStack align='center'>
                <WordleLobby />
                <Button onClick={() => setCurrentState('game')} colorScheme='green' size='sm'>Start Game</Button>
            </VStack>
        }
        case 'game' : {
            return <VStack align='center'>
                <GameBoard gameover={false}/>
                <Button onClick={() => setCurrentState('gameover')} colorScheme='green' size='sm'>End Game</Button>
            </VStack>
        }
        case 'gameover' : {
            return <GameBoard gameover={true}/>
        }
        default : {
            return <div />
        }
    }
};