import { Box, Button, Stack, VStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useGameState from '../../hooks/useGameState';
import usePlayersInTown from '../../hooks/usePlayersInTown';

/**
 * A Wordle Lobby, with buttons to join a team, your current state (red, blue, spectator), and a list of players on each team
 * @returns A JSX Element representing the Wordle lobby
 * 
 */
export default function WordleLobby(): JSX.Element {
  const players = usePlayersInTown();
  const {playerID, gameState} = useGameState();
  const myPlayer = players.find((player) => player.id === playerID);
  
  if (gameState && myPlayer) {
    const redTeam = gameState.getState().teamOneState.teamMembers.includes(playerID);
    const blueTeam = gameState.getState().teamTwoState.teamMembers.includes(playerID);
    const yourTeamHeader = (!redTeam && !blueTeam) ? 'You are Spectating!' : 'You are on a team!';
    const redButtonText = (redTeam) ? 'Leave Red Team' : 'Join Red Team';
    const blueButtonText = (blueTeam) ? 'Leave Blue Team' : 'Join Blue Team';
    return (
      <VStack align='center'>
        <h1> WORDLE </h1>
        <Text fontSize='lg'>Join a team to play Wordle!</Text>
        <Stack spacing={2} direction='row' align='center'>
          <Button onClick={() => (redTeam) ? gameState.removePlayer(playerID) : gameState.addPlayerToTeam(myPlayer, 1)} colorScheme='red' size='sm'>{redButtonText}</Button> 
          <Button onClick={() => (blueTeam) ? gameState.removePlayer(playerID) : gameState.addPlayerToTeam(myPlayer, 2)} colorScheme='blue' size='sm'>{blueButtonText}</Button>
        </Stack>
        <Text fontSize='sm'>{yourTeamHeader}</Text>
      </VStack>
    );
  }
  
  return <></>;
}





