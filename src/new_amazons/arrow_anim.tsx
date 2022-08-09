import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component } from "solid-js";
import { colorPalette } from "./settings";
import { makeTransform } from "./util";
import { animatedArr } from "./board";

export const ArrowAnim: Component<{
  size: string;
}> = (props) => (
  <div
    id={"arrow-anim"}
    class="absolute z-10 grid place-items-center smooth"
    classList={{ hidden: animatedArr().hidden }}
    style={{
      width: props.size,
      height: props.size,
      transform: makeTransform(animatedArr().square),
    }}
  >
    <div
      class="absolute w-1/2 h-1/2 rounded-full"
      style={{ "background-color": colorPalette()["arrow"] }}
    />
  </div>
);
