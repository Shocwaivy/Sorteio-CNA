import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface ActiveGiveawaysData {
  giveaways: ({
    id: UUIDString;
    title: string;
    description: string;
    prize: string;
    imageUrl?: string | null;
    entryStartDate: TimestampString;
    entryEndDate: TimestampString;
    organizer?: {
      displayName: string;
    };
  } & Giveaway_Key)[];
}

export interface Entry_Key {
  id: UUIDString;
  __typename?: 'Entry_Key';
}

export interface Giveaway_Key {
  id: UUIDString;
  __typename?: 'Giveaway_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Winner_Key {
  id: UUIDString;
  __typename?: 'Winner_Key';
}

/** Generated Node Admin SDK operation action function for the 'ActiveGiveaways' Query. Allow users to execute without passing in DataConnect. */
export function activeGiveaways(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ActiveGiveawaysData>>;
/** Generated Node Admin SDK operation action function for the 'ActiveGiveaways' Query. Allow users to pass in custom DataConnect instances. */
export function activeGiveaways(options?: OperationOptions): Promise<ExecuteOperationResponse<ActiveGiveawaysData>>;

