import "./square.css";
import "./tokens/token.css";

import { Queen } from "./tokens/queen";
import { Movable } from "./tokens/movable";
import { Arrow } from "./tokens/arrow";
import { Match, Switch } from "solid-js";
import { createDroppable } from "@thisbeyond/solid-dnd";

export const Square = (props: {
  token?: string;
  active?: boolean; // make sure to give with queens
  name: string;
  height: string;
  color: string;
  onClick: () => void;
}) => {
  const droppable = createDroppable(props.name);

  return (
    <div
      ref={droppable.ref}
      onMouseDown={props.onClick}
      style={{ height: props.height }}
      classList={{ "active-drop": droppable.isActiveDroppable }}
      class={`square color${props.color}`}
    >
      <Switch>
        <Match when={props.token === "x"}>
          <Arrow />
        </Match>
        <Match when={props.token === "m"}>
          <Movable />
        </Match>
        <Match when={props.token === "w" || props.token === "b"}>
          <Queen team={props.token!} active={props.active!} />
        </Match>
      </Switch>
      {/* <Show when={props.token}>{tokens[props.token as string]()}</Show> */}
    </div>
  );
};
