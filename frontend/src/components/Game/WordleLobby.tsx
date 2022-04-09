import { Box, Button, Stack, VStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';

/**
 * Should show players in the conversation area (if we have this as a side bar next to a conversation area we don't need to replicate this), 
 * Should have buttons to join Red or Blue team, and a button to start the game (in sidebar)
 * 
 * The start game button should launch a new tab or a pop-up window with the Wordle Game 
 * (we could integrate it on screen later if needed)
 *
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
      <Button colorScheme='green' size='md'>Start Game</Button>
      <Text fontSize='sm'>{yourTeamHeader}</Text>
    </VStack>
  );
}





