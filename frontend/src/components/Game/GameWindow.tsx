import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import WordleLobby from './WordleLobby';
import usePlayerMovement from '../../hooks/usePlayerMovement';
import ConversationArea, { NO_TOPIC_STRING } from '../../classes/ConversationArea';
import { ServerPlayer } from '../../classes/Player';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useConversationAreas from '../../hooks/useConversationAreas';

// mock

type GameConvoArea = {
    label : string
    topic : string
    game : Game | undefined
}

type Game = undefined | {
    state : string
}


export default function GameWindow(): JSX.Element {
    // will need to use the model hook to access the state of the game (game list vs lobby vs game play vs game over)
    // need to tell back end state has changed!
    const [playerID] = useState(useCoveyAppState().myPlayerID);
    const conversationAreas = useConversationAreas();
    const [currentConversationArea, setCurrentConversationArea] = useState<ConversationArea | undefined>(undefined);
    const [currentGame, setCurrentGame] = useState<Game>(undefined);
    const [mockGame, setMockGame] = useState<Game>({state:'list'});

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
    }, [currentGame?.state]);

    // if currentGame has changed, rerender
    useEffect(() => {
    }, [currentGame]);

    // if currentConversationArea has changed, set currentGame
    useEffect(() => {
        // setCurrentGame(currentConversationArea.game);
        if (currentConversationArea) {
            setCurrentGame(mockGame);
        }
        else {
            setCurrentGame(undefined);
        }
    }, [currentConversationArea, mockGame, mockGame?.state]);


    // if the player is not in an active conversation, show nothing
    if (!currentConversationArea || currentConversationArea?.topic === NO_TOPIC_STRING) {
        return <Box> </Box>
    }
    // if game started, show that
    switch (currentGame?.state) {
        case 'list': {
            return (
                <VStack align='center'>
                    <Text fontSize='lg'>Choose a game to play!</Text>
                    <Button onClick={() => {
                        if (mockGame) {
                            mockGame.state = 'lobby';
                        }}} colorScheme='blue' size='md'>Wordle</Button>
                    <Button onClick={() => window.open("https://sudoku.com/")} colorScheme='blue' size='md'>Sudoku</Button>
                    <Button onClick={() => window.open("https://www.washingtonpost.com/crossword-puzzles/daily/")} colorScheme='blue' size='md'>Daily Crossword</Button>
                    <Button onClick={() => window.open("https://playtictactoe.org/")} colorScheme='blue' size='md'>Tic Tac Toe</Button>
                </VStack>
            );
        }
        case 'lobby' : {
            return <WordleLobby />
        }
        case 'game' : {
            return <div /> // <WordleGame></WordleGame>
        }
        default : {
            return <Box> </Box>
        }
    }
};