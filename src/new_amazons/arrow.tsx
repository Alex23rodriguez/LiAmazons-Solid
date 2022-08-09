import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";
import { colorPalette } from "./settings";
import { makeTransform } from "./util";

let arrowCount = 1;
export const Arrow: Component<{}> = () => (
  <div class="absolute grid place-items-center w-full h-full z-10">
    <div
      class="absolute w-1/2 h-1/2 rounded-full"
      style={{ "background-color": colorPalette()["arrow"] }}
    />
  </div>
);
