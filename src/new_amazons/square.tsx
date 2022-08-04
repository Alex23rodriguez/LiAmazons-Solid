import { Square as TSquare } from "amazons-game-engine/dist/types";
import { ParentComponent, Show } from "solid-js";
import { CanMove } from "./canMove";

export const Square: ParentComponent<{
  square: TSquare;
  color: string;
  canMove: boolean;
  shooting: boolean;
  onClick: (sq: TSquare, token: string) => void;
}> = (props) => (
  <div
    id={props.square}
    class="relative w-full"
    style={{ "padding-bottom": "100%", "background-color": props.color }}
    onClick={() => props.onClick(props.square, props.canMove ? "m" : "")}
  >
    <Show when={props.canMove}>{<CanMove shooting={props.shooting} />}</Show>
  </div>
);
