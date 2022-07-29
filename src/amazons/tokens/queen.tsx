import { Draggable } from "../../dnd/dnd";

export const Queen = (props: { team: string }) => (
  <Draggable type={props.team} class="container">
    <div class={`inner-circle large ${props.team}`}></div>
    <div class="inner-circle small"></div>
  </Draggable>
);
