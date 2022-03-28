import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ConversationArea, { ConversationAreaListener, NO_TOPIC_STRING } from '../../classes/ConversationArea';
import Player from '../../classes/Player';
import useConversationAreas from '../../hooks/useConversationAreas'
import usePlayersInTown from '../../hooks/usePlayersInTown';
import PlayerName from './PlayerName';
import { sortAlphabetically } from './PlayersList';

/**
 * Prop Type for ConversationArea
 */
type ConversationAreaProp = {
  conversationArea: ConversationArea
}

/**
 * Component for each individual conversation Area
 * @param param0 takes in a ConversationArea of type ConversationAreaProp 
 * @returns A React Element that displays the relevant converstion area information such as 
 * Conversation Area Label and Topic as well as the list of players within the conversation area
 */
function ConversationAreaName({conversationArea}: ConversationAreaProp) {
  const [occupants, setOccupants] = useState(conversationArea.occupants);
  useEffect(() => {
    const setOccupantsToOccupantsList = (newOccupants: string[]) => {
      setOccupants(newOccupants);
    };
    const listener: ConversationAreaListener = {onOccupantsChange: setOccupantsToOccupantsList};
    conversationArea.addListener(listener);

    return function cleanUp() {
      conversationArea.removeListener(listener);
    };
  }, [conversationArea]);

  const playersInTown = usePlayersInTown();
  const conversationAreaOccupants = occupants
  .map((playerId) => playersInTown.find((player) => player.id === playerId))
  .filter((occupant: Player | undefined): occupant is Player => occupant !== undefined);

  const listItems = conversationAreaOccupants.map((player) => (
    <ListItem key={player.id}> 
      <PlayerName key={player.id} player={player}/>  
    </ListItem>));

  return (
  <Box>
    <h3><b>{conversationArea.label}: {conversationArea.topic}</b></h3>
    <UnorderedList> {listItems} </UnorderedList>
  </Box>);
}

/**
 * Displays a list of "active" conversation areas, along with their occupants 
 * 
 * A conversation area is "active" if its topic is not set to the constant NO_TOPIC_STRING that is exported from the ConverationArea file
 * 
 * If there are no active conversation areas, it displays the text "No active conversation areas"
 * 
 * If there are active areas, it sorts them by label ascending, using a numeric sort with base sensitivity
 * 
 * Each conversation area is represented as a Box:
 *  With a heading (H3) `{conversationAreaLabel}: {conversationAreaTopic}`,
 *  and an unordered list of occupants.
 * 
 * Occupants are *unsorted*, appearing in the order 
 *  that they appear in the area's occupantsByID array. Each occupant is rendered by a PlayerName component,
 *  nested within a ListItem.
 * 
 * Each conversation area component must subscribe to occupant updates by registering an `onOccupantsChange` listener on 
 *  its corresponding conversation area object.
 * It must register this listener when it is mounted, and remove it when it unmounts.
 * 
 * See relevant hooks: useConversationAreas, usePlayersInTown.
 */

export default function ConversationAreasList(): JSX.Element {
  const townConversationAreas = useConversationAreas()
  .map((conversationArea) => conversationArea)
  .filter((conversationArea) => conversationArea.topic !== NO_TOPIC_STRING)
  .sort((a, b) => sortAlphabetically(a.label, b.label));
  
  const renderedConversationAreas = townConversationAreas.map((conversationArea) => 
  <ConversationAreaName key={conversationArea.label} conversationArea={conversationArea}/>)
  const toRender = (townConversationAreas.length === 0) ? <Box> No active conversation areas </Box> : renderedConversationAreas;

  return (
    <div>
      <h2>
        <strong>Active Conversation Areas:</strong>
      </h2>
      {toRender}
    </div>
  );
}