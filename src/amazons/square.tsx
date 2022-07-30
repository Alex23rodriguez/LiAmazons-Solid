import "./square.css";
import "./tokens/token.css";

import { Queen } from "./tokens/queen";
import { Movable } from "./tokens/movable";
import { Arrow } from "./tokens/arrow";
import { JSX } from "solid-js/jsx-runtime";
import { Match, Show, Switch } from "solid-js";
import { Droppable } from "../dnd/dnd";

export const Square = (props: {
  token?: string;
  active?: boolean; // make sure to give with queens
  name: string;
  height: string;
  color: string;
  onClick: () => void;
}) => {
  return (
    <div
      onMouseDown={props.onClick}
      style={{ height: props.height }}
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
      <Droppable
        type={props.token || ""}
        class="fullsize"
        other_div_props={{ id: "d" + props.name }}
        classAccept="draggable"
        classReject="not-draggable"
      ></Droppable>
    </div>
  );
};
