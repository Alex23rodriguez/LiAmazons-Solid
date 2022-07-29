import {
  createDraggable,
  createDroppable,
  transformStyle,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";
import { ParentComponent } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      draggable: boolean;
      droppable: boolean;
    }
  }
}

let draggable_id = 0;

export const Draggable: ParentComponent<{
  // id: string | number;
  type: any;
  class?: string;
  active: boolean;
}> = (props) => {
  // console.log(draggable_id, props.type);
  const draggable = createDraggable(draggable_id++, {
    type: props.type,
  });

  return (
    <div
      class={props.class}
      ref={draggable.ref}
      style={transformStyle(draggable.transform)}
    >
      <div
        class="inner-circle large invisible"
        style={{ "z-index": 2 }}
        {...draggable.dragActivators}
        classList={{ inactive: !props.active }}
      />
      {props.children}
    </div>
  );
  /* <div use:draggable class={props.class}> */
  // {props.children}
  // </div>
};

let droppable_id = 0;

export const Droppable: ParentComponent<{
  type: string;
  other_div_props?: object;
  class?: string;
  classAccept?: string;
  classReject?: string;
}> = (props) => {
  const droppable = createDroppable(droppable_id++, { type: props.type });

  const [, { activeDraggable }] = useDragDropContext()!;

  const activeClass = () => {
    // console.log("mytype", props.type);
    // console.log("activeDraggable", activeDraggable()?.data.type);
    // debugger;
    let ans;
    if (droppable.isActiveDroppable) {
      let actDrg = activeDraggable();
      if (actDrg!.data.type === props.type) {
        ans = props.classAccept;
      } else {
        ans = props.classReject;
      }
    }
    // console.log(ans);
    return ans;
  };

  return (
    <div
      use:droppable
      {...props.other_div_props}
      class={`${props.class || ""} ${activeClass() || ""}`}
    >
      {props.children}
    </div>
  );
};
