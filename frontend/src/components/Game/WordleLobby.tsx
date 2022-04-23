import { Button, Stack, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import usePlayerConversationArea from '../../hooks/usePlayerConversationArea';

/**
 * A Wordle Lobby, with buttons to join a team, your current state (red, blue, spectator), and a list of players on each team
 * @returns A JSX Element representing the Wordle Lobby
 * 
 */
export default function WordleLobby(): JSX.Element {
  // const { apiClient, sessionToken, currentTownID } = useCoveyAppState();
  const [playerID] = useState(useCoveyAppState().myPlayerID);
  const currentConversationArea = usePlayerConversationArea();
  console.log(currentConversationArea);

  useEffect(() => {

  }, [currentConversationArea])
  
  // ensure that the conversation area has an active game session, then display the lobby
  // onClick={() => (redTeam) ? apiClient.removePlayer() : apiClient.addPlayer()}
  // onClick={() => (blueTeam) ? apiClient.removePlayer() : apiClient.addPlayer()}
  if (currentConversationArea?.game) {
    const activeGame = currentConversationArea.game;
    const redTeam = true; // activeGame.getState().teamOneState?.teamMembers.includes(playerID);
    const blueTeam = false; // activeGame.getState().teamTwoState?.teamMembers.includes(playerID);
    const yourTeamHeader = (!redTeam && !blueTeam) ? 'You are Spectating!' : 'You are on a team!';
    const redButtonText = (redTeam) ? 'Leave Red Team' : 'Join Red Team';
    const blueButtonText = (blueTeam) ? 'Leave Blue Team' : 'Join Blue Team';
    return (
      <VStack align='center'>
        <h1> WORDLE </h1>
        <Text fontSize='lg'>Join a team to play Wordle!</Text>
        <Stack spacing={2} direction='row' align='center'>
          <Button colorScheme='red' size='sm'>{redButtonText}</Button> 
          <Button colorScheme='blue' size='sm'>{blueButtonText}</Button>
        </Stack>
        <Text fontSize='sm'>{yourTeamHeader}</Text>
      </VStack>
    );
  }
  
  return <></>;
}





