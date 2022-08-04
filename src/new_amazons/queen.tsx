import { Square as TSquare } from "amazons-game-engine/dist/types";
import { Component, createEffect, createMemo, createSignal } from "solid-js";
import { colorPalette, setColor } from "./settings";
import { makeTransform } from "./util";

let queenCount = 1;
export const Queen: Component<{
  square: TSquare;
  team: string;
  size: string;
  onClick: (sq: TSquare) => void;
}> = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.square)}
      id={"queen" + queenCount++}
      class="absolute z-20 grid place-items-center"
      style={{
        width: props.size,
        height: props.size,
        transform: makeTransform(props.square),
      }}
      classList={{ smooth: true }}
    >
      <div
        class="absolute w-4/5 h-4/5 rounded-full border border-black"
        style={{ "background-color": colorPalette()[props.team] }}
      />
      <div class="absolute w-3/5 h-3/5 rounded-full border border-black" />
    </div>
  );
};
