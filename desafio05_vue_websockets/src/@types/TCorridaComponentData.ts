import { TAnimal } from "./TAnimal"

export type TCorridaComponentData = {
  start:         boolean;
  wsConnection?: WebSocket;
  animalsList:   TAnimal[];
  winner?:       TAnimal;
}
