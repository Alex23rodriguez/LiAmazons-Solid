import { Draggable } from "../../dnd/dnd";

export const Queen = (props: { team: string; active: boolean }) => (
  <Draggable type={props.team} class="container" active={props.active}>
    <div class={`inner-circle large ${props.team}`}></div>
    <div class="inner-circle small"></div>
  </Draggable>
);
