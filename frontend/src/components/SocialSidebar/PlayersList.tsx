import { ListItem, OrderedList, Tooltip } from '@chakra-ui/react';
import React from 'react';
import Player from '../../classes/Player';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import usePlayersInTown from '../../hooks/usePlayersInTown';
import PlayerName from './PlayerName'

/**
 * Function that returns a number indicating which numbers comes first alphanumerically
 * @param a the first string passed in, the base string
 * @param b the second string passed in, the string being compared to
 * @returns A positive number if "a" comes before "b", a negative number if "b" comes before "a", and 0 if "a" and "b" are equal
 */
export function sortAlphabetically(a: string, b: string): number {
  return a.localeCompare(b, undefined, {numeric: true});
}

/**
 * Lists the current players in the town, along with the current town's name and ID
 * 
 * Town name is shown in an H2 heading with a ToolTip that shows the label `Town ID: ${theCurrentTownID}`
 * 
 * Players are listed in an OrderedList below that heading, sorted alphabetically by userName (using a numeric sort with base precision)
 * 
 * Each player is rendered in a list item, rendered as a <PlayerName> component
 * 
 * See `usePlayersInTown` and `useCoveyAppState` hooks to find the relevant state.
 * 
 */
export default function PlayersInTownList(): JSX.Element {
  const players: Player[] = usePlayersInTown()
  .map((player: Player) =>(player))
  .sort((a, b) => sortAlphabetically(a.userName, b.userName));
  
  const appState = useCoveyAppState();
  const listItems = players.map((player) => 
  (<ListItem key={player.id}> 
    <PlayerName key={player.id} player={player}/>  
  </ListItem>));

  return (
  <div>
    <Tooltip label={`Town ID: ${appState.currentTownID}`} 
    aria-label={`Town ID: ${appState.currentTownID}`} 
    role='tooltip'>
      <h2> <strong>{`Current town: ${appState.currentTownFriendlyName}`}</strong></h2>
    </Tooltip>
    <OrderedList> {listItems} </OrderedList>
  </div>
 );
}