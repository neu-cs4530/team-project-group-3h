import { Box, Button, Stack, VStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';

/**
 * A Wordle Lobby, with buttons to join a team, your current state (red, blue, spectator), and a list of players on each team
 * @returns A JSX Element representing the Wordle lobby
 */
export default function WordleLobby(): JSX.Element {
  const [team, setTeam] = useState('none');
  
  const yourTeamHeader = (team === 'none') ? 'You are Spectating!' : `You are ${  team  }!`;
  const redButtonText = (team === 'red') ? 'Leave Red Team' : 'Join Red Team';
  const blueButtonText = (team === 'blue') ? 'Leave Blue Team' : 'Join Blue Team';

  return (
    <VStack align='center'>
      <h1> WORDLE </h1>
      <Text fontSize='lg'>Join a team to play Wordle!</Text>
      <Stack spacing={2} direction='row' align='center'>
        <Button onClick={() => (team === 'red') ? setTeam('none') : setTeam('red')} colorScheme='red' size='sm'>{redButtonText}</Button>
        <Button onClick={() => (team === 'blue') ? setTeam('none') : setTeam('blue')} colorScheme='blue' size='sm'>{blueButtonText}</Button>
      </Stack>
      <Text fontSize='sm'>{yourTeamHeader}</Text>
    </VStack>
  );
}





