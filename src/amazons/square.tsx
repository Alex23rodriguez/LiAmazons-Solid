import "./square.scss";

import { Queen } from "./queen";
import { Arrow } from "./arrow";

export const Square = (props: {
  queen: number;
  arrow: boolean;
  height: string;
  color: string;
  canMove: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      style={{ height: props.height }}
      class={`square color${props.color}`}
      onClick={props.onClick}
    >
      {props.queen ? (
        <Queen team={`team${props.queen}`} />
      ) : props.arrow ? (
        <Arrow />
      ) : props.canMove ? (
        <div class="inner-square" />
      ) : null}
      {/* {props.name} */}
    </div>
  );
};
