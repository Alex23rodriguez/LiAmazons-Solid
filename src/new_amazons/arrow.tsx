import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";
import { colorPalette } from "./settings";
import { makeTransform } from "./util";

let arrowCount = 1;
export const Arrow: Component<{
  size: string;
  square: TSquare;
  onClick: (sq: TSquare, token: string) => void;
}> = (props) => (
  <div
    id={"arrow" + arrowCount++}
    class="absolute z-10 grid place-items-center smooth"
    style={{
      width: props.size,
      height: props.size,
      transform: makeTransform(props.square),
    }}
    onClick={() => props.onClick(props.square, "x")}
  >
    <div
      class="absolute w-1/2 h-1/2 rounded-full"
      style={{ "background-color": colorPalette()["arrow"] }}
    />
  </div>
);
