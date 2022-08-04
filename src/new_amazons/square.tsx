import { Square as TSquare } from "amazons-game-engine/dist/types";
import { ParentComponent, Show } from "solid-js";
import { CanMove } from "./canMove";

export const Square: ParentComponent<{
  square: TSquare;
  color: string;
  canMove: boolean;
  onClick: (sq: TSquare) => void;
}> = (props) => (
  <div
    id={props.square}
    class="relative w-full"
    style={{ "padding-bottom": "100%", "background-color": props.color }}
  >
    <Show when={props.canMove}>{<CanMove onClick={props.onClick} />}</Show>
  </div>
);
