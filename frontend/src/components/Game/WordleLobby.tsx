import { Button, Stack, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ConversationArea from '../../classes/ConversationArea';
import { GameState } from '../../classes/GameTypes';
import { GameJoinTeamRequest } from '../../classes/TownsServiceClient';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import usePlayerConversationArea from '../../hooks/usePlayerConversationArea';
import usePlayersInTown from '../../hooks/usePlayersInTown';

/**
 * A Wordle Lobby, with buttons to join a team, your current state (red, blue, spectator), and a list of players on each team
 * @returns A JSX Element representing the Wordle Lobby
 * 
 */
export default function WordleLobby(): JSX.Element {
  const { apiClient, sessionToken, currentTownID } = useCoveyAppState();
  const players = usePlayersInTown();
  const [playerID] = useState(useCoveyAppState().myPlayerID);
  const currentConversationArea = usePlayerConversationArea();
  const [currentGameState, setGameState] = useState<GameState>({
    teamOneState: undefined,
    teamTwoState: undefined,
    winner: ' ',
    isActive: false,
  });
  // const [element, setElement] = useState(<></>);  
  useEffect(() => {
    async function getGameState() {
      if (currentConversationArea) {
        const stateInfo = await apiClient.getGameState({ coveyTownID: currentTownID, sessionToken, conversationAreaLabel: currentConversationArea.label });
        setGameState(stateInfo.state);
      }
    }
    getGameState();
  });

  async function addPlayer(convoArea: ConversationArea, teamNumber: number) {
    const myPlayer = players.find((player) => player.id === playerID);
    if (myPlayer) {
      const teamJoinRequest: GameJoinTeamRequest = {
        coveyTownID: currentTownID,
        sessionToken,
        playerID: myPlayer.id,
        teamNumber,
        conversationAreaLabel: convoArea.label
      };
      await apiClient.addPlayerToGameTeam(teamJoinRequest);
    }
  }

  async function removePlayer(convoArea: ConversationArea) {
    await apiClient.removePlayerFromGameTeam({
      coveyTownID: currentTownID, sessionToken,
      playerID, conversationAreaLabel: convoArea.label
    });
  }

  function constructLobby(convoArea: ConversationArea) {
    const gameState = currentGameState;
    // console.log(gameState);
    const redTeam = gameState.teamOneState?.teamMembers.includes(playerID);
    const blueTeam = gameState.teamTwoState?.teamMembers.includes(playerID);
    const yourTeamHeader = (!redTeam && !blueTeam) ? 'You are Spectating!' : 'You are on a team!';
    const redButtonText = (redTeam) ? 'Leave Red Team' : 'Join Red Team';
    const blueButtonText = (blueTeam) ? 'Leave Blue Team' : 'Join Blue Team';

    return(
      <VStack align='center'>
        <h1> WORDLE </h1>
        <Text fontSize='lg'>Join a team to play Wordle!</Text>
        <Stack spacing={2} direction='row' align='center'>
          <Button onClick={() => (redTeam) ? removePlayer(convoArea) : addPlayer(convoArea, 1)} colorScheme='red' size='sm'>{redButtonText}</Button>
          <Button onClick={() => (blueTeam) ? removePlayer(convoArea) : addPlayer(convoArea, 2)} colorScheme='blue' size='sm'>{blueButtonText}</Button>
        </Stack>
        <Text fontSize='sm'>{yourTeamHeader}</Text>
      </VStack>
    );
  }

  if (!currentConversationArea) return (<></>);
  if (!currentConversationArea.game) return (<></>);
  return constructLobby(currentConversationArea);
  // return toRender;
  // return element;
}





