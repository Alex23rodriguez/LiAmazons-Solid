import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";

export const Square: Component<{ name: TSquare; color: string }> = (props) => (
  <div
    class="w-full"
    style={{ "padding-top": "100%", "background-color": props.color }}
  />
);
