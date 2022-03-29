import { Box, Button, Stack, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import WorldMap from '../world/WorldMap';

/**
 * Should show players in the conversation area (if we have this as a side bar next to a conversation area we don't need to replicate this), 
 * Should have buttons to join Red or Blue team, and a button to start the game (in sidebar)
 * 
 * The start game button should launch a new tab or a pop-up window with the Wordle Game 
 * (we could integrate it on screen later if needed)
 *
 */
 export default function WordleLobby(): JSX.Element {
    return (
      <VStack align='center'>
      <Stack spacing={2} direction='row' align='center'>
        <Button onclick={mockRedClick} colorScheme='red' size='sm'>{redButtonText}</Button>
        <Button onclick={mockBlueClick} colorScheme='blue' size='sm'>{blueButtonText}</Button>
      </Stack>
      <Button onclick={mockStartGameClick} colorScheme='green' size='md'>Start Game</Button>
      <Text fontSize='sm'>{yourTeamHeader}</Text>
      </VStack>
    );
  }

  function redButtonText() {
    const myPlayerID = 5;
    // will need to create a hook that gets the state of the model, so that we can loop through the list of players
    // to find what state this player is
    const redPlayers = [1, 3, 5];

    if(redPlayers.includes(myPlayerID)) {
      return "Leave red team";
    }
    else {
      return "Join red team";
    }
  }

  function blueButtonText() {
    const myPlayerID = 5;
    // will need to create a hook that gets the state of the model, so that we can loop through the list of players
    // to find what state this player is
    const bluePlayers = [2, 4, 6];

    if(bluePlayers.includes(myPlayerID)) {
      return "Leave blue team";
    }
    else {
      return "Join blue team";
    }
  }

  function yourTeamHeader() {
    //const { myPlayerID } = useCoveyAppState();
    const myPlayerID = 5;
    // will need to create a hook that gets the state of the model, so that we can loop through the list of players
    // to find what state this player is
    const redPlayers = [1, 3, 5];
    const bluePlayers = [2, 4, 6];
    
    if(redPlayers.includes(myPlayerID)) {
      return "You are Red!";
    }
    if(bluePlayers.includes(myPlayerID)) {
      return "You are Blue!";
    }
    return "You are Spectating!"; 
  }

  function mockRedClick() {
    console.log("Red button was clicked");
  }

  function mockBlueClick() {
    console.log("Blue button was clicked");
  }

  function mockStartGameClick() {
    console.log("Start game button was clicked");
  }

  

