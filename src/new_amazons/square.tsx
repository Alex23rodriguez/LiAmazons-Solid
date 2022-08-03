import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";

export const Square: Component<{ name: TSquare; color: string }> = (props) => (
  <div class="w-full h-full" style={{ "background-color": props.color }} />
);
