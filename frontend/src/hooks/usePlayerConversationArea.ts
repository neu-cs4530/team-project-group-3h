import { useState, useEffect } from "react";
import ConversationArea from "../classes/ConversationArea";
import { ServerPlayer } from "../classes/Player";
import useConversationAreas from "./useConversationAreas";
import useCoveyAppState from "./useCoveyAppState";
import usePlayerMovement from "./usePlayerMovement";
import usePlayersInTown from "./usePlayersInTown";

/**
 * Returns the conversation area your player is in, or undefined if they are not in one. Listens for player movement events and updates the
 * conversation area accordingly.
 * @returns The conversation area the player is in, or undefined if it is not inside one.
 */
export default function usePlayerConversationArea() : ConversationArea | undefined {
    const [playerID] = useState(useCoveyAppState().myPlayerID);
    const conversationAreas = useConversationAreas();
    const [currentConversationArea, setCurrentConversationArea] = useState<ConversationArea | undefined>(undefined);
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

    return currentConversationArea;
}