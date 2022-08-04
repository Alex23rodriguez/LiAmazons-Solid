import { Square as TSquare } from "amazons-game-engine/dist/types";
import { ParentComponent, Show } from "solid-js";
import { selected } from "./board";
import { CanMove } from "./canMove";
import { colorPalette } from "./settings";

export const Square: ParentComponent<{
  square: TSquare;
  color: "light" | "dark";
  canMove: boolean;
  onClick: (sq: TSquare, token: string) => void;
}> = (props) => {
  console.log("creating square");
  const color = () => {
    let key = props.color;
    if (selected()[0] === props.square) key += "_h";
    return colorPalette()[key];
  };
  return (
    <div
      id={props.square}
      class="relative w-full"
      style={{ "padding-bottom": "100%", "background-color": color() }}
      onClick={() => props.onClick(props.square, props.canMove ? "m" : "")}
    >
      <Show when={props.canMove}>{<CanMove />}</Show>
    </div>
  );
};
