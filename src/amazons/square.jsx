import "./square.scss";

import Queen from "./queen";
import Arrow from "./arrow";

const Square = (props) => {
  return (
    <div
      style={{ height: props.height }}
      class={`square color${props.color}`}
      onClick={props.handleClick}
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

export default Square;
