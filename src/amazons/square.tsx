import "./square.scss";

import { Queen } from "./queen";
import { Arrow } from "./arrow";
import { JSX } from "solid-js/jsx-runtime";
import { Show } from "solid-js";

const tokens: { [token: string]: () => JSX.Element } = {
  w: () => <Queen team="w" />,
  b: () => <Queen team="b" />,
  x: () => <Arrow />,
  m: () => <div class="inner-square" />,
};

export const Square = (props: {
  token?: string;
  height: string;
  color: string;
  onClick: () => void;
}) => {
  return (
    <div
      style={{ height: props.height }}
      class={`square color${props.color}`}
      onClick={props.onClick}
    >
      <Show when={props.token}>{tokens[props.token as string]()}</Show>
    </div>
  );
};
