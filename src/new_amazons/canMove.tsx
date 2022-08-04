import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";
import { shooting } from "./board";
import { colorPalette } from "./settings";
export const CanMove: Component = () => {
  return (
    <div class="absolute grid place-items-center w-full h-full">
      <div
        class="rounded-full w-1/4 h-1/4 z-10"
        style={{
          opacity: 0.5,
          "background-color":
            colorPalette()[shooting() ? "canMoveShooting" : "canMove"],
        }}
      ></div>
    </div>
  );
};
