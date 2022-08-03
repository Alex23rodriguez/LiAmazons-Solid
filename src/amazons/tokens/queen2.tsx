import { createDraggable, transformStyle } from "@thisbeyond/solid-dnd";
import { square_to_coords } from "amazons-game-engine";
import { Square } from "amazons-game-engine/dist/types";
import "../animation/test.css";

let queen_id = 10; // TODO maybe move ID elsewhere
export const Queen2 = (props: {
  team: string;
  active: boolean;
  square: Square;
  squareSize: string;
}) => {
  const draggable = createDraggable(queen_id++, { square: props.square });
  return (
    <div
      class="absolute z-10 "
      style={{
        width: props.squareSize,
        height: props.squareSize,
        transform: makeTransform(props.square),
      }}
    >
      {/* overlay left behind*/}
      <div
        class="opacity-50"
        classList={{ hidden: !draggable.isActiveDraggable }}
      >
        <div
          class={`inner-circle bordered h-4/5 w-4/5 ${
            props.team === "w" ? "bg-stone-100" : "bg-stone-600"
          }`}
        ></div>
        <div class="inner-circle bordered h-3/5 w-3/5"></div>
      </div>
      {/* actual queen layout*/}
      <div
        class="w-full h-full"
        ref={draggable.ref}
        style={transformStyle(draggable.transform)}
        classList={{ "z-20": draggable.isActiveDraggable }}
      >
        <div
          class={`inner-circle bordered h-4/5 w-4/5 ${
            props.team === "w" ? "bg-stone-100" : "bg-stone-600"
          }`}
        ></div>
        <div class="inner-circle bordered h-3/5 w-3/5"></div>
        {/* draggable part of component */}
        {/* this goes at the end so it is drawn on top*/}
        <div
          class="inner-circle h-4/5 w-4/5 cursor-pointer touch-none"
          classList={{ hidden: !props.active }}
          {
            ...draggable.dragActivators /* most important part!*/
          }
        />
      </div>
    </div>
  );
};

function makeTransform(sq: Square) {
  const { row, col } = square_to_coords(sq, { rows: 6, cols: 6 });

  const ans = `translate(${col}00%, ${row}00%)`;
  return ans;
}
