export * from './configuration.service';
import { ConfigurationService } from './configuration.service';
export * from './game.service';
import { GameService } from './game.service';
export * from './userManagement.service';
import { UserManagementService } from './userManagement.service';
export const APIS = [ConfigurationService, GameService, UserManagementService];

/// Below Path activates the connection to the .NET Backend
export const backendPath = 'https://localhost:7246';

/// Below Path activates the connection to the NestJS Backend
//export const backendPath = 'http://localhost:7246';
