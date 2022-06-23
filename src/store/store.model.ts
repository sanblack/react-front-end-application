import { Session } from "./session/session.model";

export interface Action {
  type: string;
  data: Record<string, unknown>;
}

export interface Store {
  session: Session;
}

export type GetState = () => Store;
