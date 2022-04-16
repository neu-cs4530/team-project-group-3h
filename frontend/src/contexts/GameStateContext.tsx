import React from 'react';
import { GameState } from '../classes/GameTypes';

const Context = React.createContext<GameState | null>(null);

export default Context;