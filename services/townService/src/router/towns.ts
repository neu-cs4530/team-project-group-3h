import express, { Express } from 'express';
import io from 'socket.io';
import { Server } from 'http';
import { StatusCodes } from 'http-status-codes';
import {
  conversationAreaCreateHandler,
  gameAddPlayerHandler,
  gameCreateHandler,
  gameInputActionHandler,
  gameRemovePlayerHandler,
  gameStartHandler,
  gameStateHandler,
  townCreateHandler, townDeleteHandler,
  townJoinHandler,
  townListHandler,
  townSubscriptionHandler,
  townUpdateHandler,
} from '../requestHandlers/CoveyTownRequestHandlers';
import { logError } from '../Utils';
import { GameJoinTeamRequest } from '../client/TownsServiceClient';

export default function addTownRoutes(http: Server, app: Express): io.Server {
  /**
   * Create a new session (aka join a town)
   */
  app.post('/sessions', express.json(), async (req, res) => {
    try {
      const result = await townJoinHandler({
        userName: req.body.userName,
        coveyTownID: req.body.coveyTownID,
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
   * Delete a town
   */
  app.delete('/towns/:townID/:townPassword', express.json(), async (req, res) => {
    try {
      const result = townDeleteHandler({
        coveyTownID: req.params.townID,
        coveyTownPassword: req.params.townPassword,
      });
      res.status(200)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(500)
        .json({
          message: 'Internal server error, please see log in server for details',
        });
    }
  });

  /**
   * List all towns
   */
  app.get('/towns', express.json(), async (_req, res) => {
    try {
      const result = townListHandler();
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
   * Create a town
   */
  app.post('/towns', express.json(), async (req, res) => {
    try {
      const result = townCreateHandler(req.body);
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });
  /**
   * Update a town
   */
  app.patch('/towns/:townID', express.json(), async (req, res) => {
    try {
      const result = townUpdateHandler({
        coveyTownID: req.params.townID,
        isPubliclyListed: req.body.isPubliclyListed,
        friendlyName: req.body.friendlyName,
        coveyTownPassword: req.body.coveyTownPassword,
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });
  /**
   * Create a conversation area
   */
  app.post('/towns/:townID/conversationAreas', express.json(), async (req, res) => {
    try {
      const result = conversationAreaCreateHandler({
        coveyTownID: req.params.townID,
        sessionToken: req.body.sessionToken,
        conversationArea: req.body.conversationArea,
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
   * Create a game
   */
  app.post('/towns/:townID/games', express.json(), async (req, res) => {
    try {
      const result = gameCreateHandler({
        coveyTownID: req.params.townID,
        sessionToken: req.body.sessionToken,
        conversationAreaLabel: req.body.conversationAreaLabel,
        gameID: 'wordle',
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
   * Create a game
   */
  app.post('/towns/:townID/startGame', express.json(), async (req, res) => {
    try {
      const result = gameStartHandler({
        coveyTownID: req.params.townID,
        sessionToken: req.body.sessionToken,
        conversationAreaLabel: req.body.conversationAreaLabel,
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
   * updates a game
   */
  app.post('/towns/:townID/updategame', express.json(), async (req, res) => {
    try {
      const result = gameInputActionHandler({
        coveyTownID: req.params.townID,
        sessionToken: req.body.sessionToken,
        conversationAreaLabel: req.body.conversationAreaLabel,
        gameAction: req.body.gameAction,
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
   * gets the gameState
   */
  app.get('/towns/:townID/gamestate/:conversationAreaLabel/', express.json(), async (req, res) => {
    try {
      const result = gameStateHandler({
        coveyTownID: req.params.townID,
        conversationAreaLabel: req.params.conversationAreaLabel,
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
 * adds a player to the game
 */
  app.post('/towns/:townID/joingameteam', express.json(), async (req, res) => {
    try {
      const teamJoinRequest: GameJoinTeamRequest = {
        coveyTownID: req.params.townID,
        sessionToken: req.body.sessionToken,
        playerID: req.body.playerID,
        teamNumber: req.body.teamNumber,
        conversationAreaLabel: req.body.conversationAreaLabel,
      };
      const result = gameAddPlayerHandler(teamJoinRequest);
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });

  /**
    * remove player from team
    */
  app.post('/towns/:townID/removeplayerfromteam', express.json(), async (req, res) => {
    try {
      const result = gameRemovePlayerHandler({
        coveyTownID: req.params.townID,
        sessionToken: req.body.sessionToken,
        playerID: req.body.playerID,
        conversationAreaLabel: req.body.conversationAreaLabel,
      });
      res.status(StatusCodes.OK)
        .json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'Internal server error, please see log in server for more details',
        });
    }
  });
  

  const socketServer = new io.Server(http, { cors: { origin: '*' } });
  socketServer.on('connection', townSubscriptionHandler);
  return socketServer;
}
