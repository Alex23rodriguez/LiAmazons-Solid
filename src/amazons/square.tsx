import "./square.css";
import "./tokens/token.css";

import { Queen } from "./tokens/queen";
import { Movable } from "./tokens/movable";
import { Arrow } from "./tokens/arrow";
import { JSX } from "solid-js/jsx-runtime";
import { Show } from "solid-js";
import { Droppable } from "../dnd/dnd";

const tokens: { [token: string]: () => JSX.Element } = {
  w: () => <Queen team="w" />,
  b: () => <Queen team="b" />,
  x: () => <Arrow />,
  m: () => <Movable />,
};

export const Square = (props: {
  token?: string;
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
      <Show when={props.token}>{tokens[props.token as string]()}</Show>
      <Droppable
        type={props.token}
        class="fullsize"
        other_div_props={{ id: "d" + props.name }}
        classAccept="draggable"
        classReject="not-draggable"
      ></Droppable>
    </div>
  );
};
