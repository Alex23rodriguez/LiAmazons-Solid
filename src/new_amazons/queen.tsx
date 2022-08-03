import { Square } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";

export const Queen: Component<{
  square: Square;
  team: string;
}> = () => {
  return <div class="absolute w-10 h-10 bg-green-400 z-20" />;
};
