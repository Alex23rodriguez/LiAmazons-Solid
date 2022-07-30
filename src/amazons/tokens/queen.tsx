import { createDraggable, transformStyle } from "@thisbeyond/solid-dnd";
import { Square } from "amazons-game-engine/dist/types";

let queen_id = 1; // TODO maybe move ID elsewhere
export const Queen = (props: {
  team: string;
  active: boolean;
  square: Square;
}) => {
  const draggable = createDraggable(queen_id++, { square: props.square });
  return (
    <div
      class="container"
      ref={draggable.ref}
      style={transformStyle(draggable.transform)}
      classList={{ "active-dragged": draggable.isActiveDraggable }}
    >
      {/* actual queen layout*/}
      <div class={`inner-circle large ${props.team}`}></div>
      <div class="inner-circle small"></div>
      {/* draggable part of component */}
      {/* this goes at the end so it is drawn on top*/}
      <div
        class="inner-circle large invisible-drag"
        classList={{ inactive: !props.active }}
        {
          ...draggable.dragActivators /* most important part!*/
        }
      />
    </div>
  );
};
