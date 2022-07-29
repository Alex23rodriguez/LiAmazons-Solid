import "./square.scss";

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
  // console.log(props.token)
  const other_props = {
    style: { height: props.height },
    onMouseDown: props.onClick,
  };

  return (
    <div>
      <Droppable
        type={props.token || "b"}
        class={`square color${props.color}`}
        classAccept="movable"
        classReject="notmovable"
        other_div_props={other_props}
      >
        <Show when={props.token}>{tokens[props.token as string]()}</Show>
      </Droppable>
    </div>
  );
};
