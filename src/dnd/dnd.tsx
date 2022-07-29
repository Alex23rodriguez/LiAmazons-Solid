import {
  createDraggable,
  createDroppable,
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
}> = (props) => {
  const draggable = createDraggable(draggable_id++, { type: props.type });
  return (
    <div use:draggable class={props.class}>
      {props.children}
    </div>
  );
};

export const Droppable: ParentComponent<{
  id: string | number;
  type: any;
  class?: string;
  classAccept?: string;
  classReject?: string;
}> = (props) => {
  const droppable = createDroppable(props.id, { type: props.type });

  const [, { activeDraggable }] = useDragDropContext()!;

  const activeClass = () => {
    if (droppable.isActiveDroppable) {
      if (activeDraggable()!.data.type === props.type) {
        return props.classAccept;
      } else {
        return props.classReject;
      }
    }
  };
  return (
    <div use:droppable class={`${props.class || ""} ${activeClass() || ""}`}>
      {props.children}
    </div>
  );
};
