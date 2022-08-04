import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";
export const CanMove: Component<{ onClick: (sq: TSquare) => void }> = (
  props
) => {
  return (
    <div class="absolute grid place-items-center w-full h-full">
      <div class="rounded-full w-1/4 h-1/4 bg-red-400 z-10"></div>
    </div>
  );
};
