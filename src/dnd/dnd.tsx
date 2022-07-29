import "./dnd.css";
import {
  DragDropProvider,
  useDragDropContext,
  DragDropSensors,
  createDraggable,
  createDroppable,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";
import { Component, ParentComponent } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      draggable: boolean;
      droppable: boolean;
    }
  }
}

const Draggable: ParentComponent<{
  id: string | number;
  type: any;
  class?: string;
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
}> = (props) => {
  const draggable = createDraggable(props.id, { type: props.type });
  return (
    <div use:draggable class={props.class} classList={props.classList}>
      {props.children}
    </div>
  );
};

const Droppable: Component<{ id: string | number; type: any }> = (props) => {
  const droppable = createDroppable(props.id, { type: props.type });

  const [, { activeDraggable }] = useDragDropContext()!;

  const activeClass = () => {
    if (droppable.isActiveDroppable) {
      if (activeDraggable()!.data.type === props.type) {
        return "!droppable-accept";
      } else {
        return "!droppable-reject";
      }
    }
    return ""; // class empty
  };

  return (
    <div use:droppable class={`droppable ${activeClass()}`}>
      Droppable
      <br />
      {`accepts type '${props.type}'`}
    </div>
  );
};

export const ConditionalDropExample = () => {
  let startRegion: HTMLDivElement;

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (droppable) {
      if (draggable.data.type === droppable.data.type) {
        droppable.node.append(draggable.node);
      }
    } else {
      startRegion.append(draggable.node);
    }
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />
      <div
        ref={startRegion!}
        class="min-h-15 flex flex-wrap gap-5 justify-center"
      >
        <Draggable id={1} type="a" class="draggable">
          {"Draggable type 'a'"}
        </Draggable>
        <Draggable id={2} type="b" class="draggable">
          {"Draggable type 'b'"}
        </Draggable>
      </div>
      <Droppable id={1} type="a" />
      <Droppable id={2} type="b" />
    </DragDropProvider>
  );
};
export default ConditionalDropExample;
