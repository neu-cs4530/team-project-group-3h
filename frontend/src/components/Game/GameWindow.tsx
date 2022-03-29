import { Box, Button, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import WordleLobby from './WordleLobby';

export default function GameWindow(): JSX.Element {
    // will need to use the model hook to access the state of the game
    
    return <Box><WordleLobby /></Box>;
};