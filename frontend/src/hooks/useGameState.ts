import { useState, useEffect } from "react";
import ConversationArea from "../classes/ConversationArea";
import { GameState } from "../classes/GameTypes";
import IGame from "../classes/IGame";
import { ServerPlayer } from "../classes/Player";
import useConversationAreas from "./useConversationAreas";
import useCoveyAppState from "./useCoveyAppState";
import usePlayerMovement from "./usePlayerMovement";

export type GameInformation = {
    playerID: string,
    gameConversationArea: ConversationArea | undefined,
    gameState: IGame | undefined
}

export default function useGameState() : GameInformation {
    const [playerID] = useState(useCoveyAppState().myPlayerID);
    const conversationAreas = useConversationAreas();
    const [currentConversationArea, setCurrentConversationArea] = useState<ConversationArea | undefined>(undefined);
    const [currentGame, setCurrentGame] = useState<IGame | undefined>(undefined);
    const [currentPhase, setCurrentPhase] = useState<string | undefined>(undefined);
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
    }, [currentPhase]);

    // if currentGame has changed, rerender
    useEffect(() => {
        if(!currentConversationArea) {
            setCurrentPhase(undefined);
        }
        if (!currentGame) {
            setCurrentPhase('list');
        }
        else {
            setCurrentPhase('lobby');
        }
    }, [currentGame, currentConversationArea]);

    // if currentConversationArea has changed, set currentGame
    useEffect(() => {
        setCurrentGame(currentConversationArea?.game);
    }, [currentConversationArea]);

    return {playerID : playerID, gameConversationArea : currentConversationArea, gameState : currentGame};
}