import "./square.css";
import "./tokens/token.css";

import { FakeQueen, Queen } from "./tokens/queen";
import { Movable } from "./tokens/movable";
import { Arrow } from "./tokens/arrow";
import { Match, Switch } from "solid-js";
import { createDroppable } from "@thisbeyond/solid-dnd";
import { Square as TSquare } from "amazons-game-engine/dist/types";

export const Square = (props: {
  token?: string;
  active?: boolean; // make sure to give with queens
  name: TSquare;
  height: string;
  color: string;
  onMouseDown: () => void;
  onMouseUp: () => void;
}) => {
  const droppable = createDroppable(props.name, {
    canMove: props.token,
  });

  return (
    <div
      ref={droppable.ref}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      style={{ height: props.height }}
      classList={{ "active-drop": droppable.isActiveDroppable }}
      class={`square color${props.color}`}
    >
      <Switch>
        <Match when={props.token === "x"}>
          <Arrow />
        </Match>
        <Match when={props.token![0] === "m"}>
          <Movable shooting={props.token![1] === "y"} />
        </Match>
        <Match when={props.token === "w" || props.token === "b"}>
          <FakeQueen team={props.token!} />
          <Queen
            team={props.token!}
            active={props.active!}
            square={props.name}
          />
        </Match>
      </Switch>
      {/* {props.name} */}
    </div>
  );
};
