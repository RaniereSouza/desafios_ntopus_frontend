import { TAnimal } from "./TAnimal";

export type TCorridaWSMessage = [
  "largada" | "update" | "vitoria",
  TAnimal | TAnimal[]
];
