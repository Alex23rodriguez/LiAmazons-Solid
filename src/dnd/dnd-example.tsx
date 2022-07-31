import "./dnd.css";
import {
  DragDropProvider,
  useDragDropContext,
  DragDropSensors,
  createDraggable,
  createDroppable,
  DragEventHandler,
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

const Draggable: ParentComponent<{
  id: string | number;
  type: any;
  class?: string;
}> = (props) => {
  const draggable = createDraggable(props.id, { type: props.type });
  return (
    <div use:draggable class={props.class}>
      {props.children}
    </div>
  );
};

const Droppable: ParentComponent<{
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
      <Droppable
        id={3}
        type="a"
        class="droppable"
        classAccept="!droppable-accept"
        classReject="!droppable-reject"
      >
        Droppable
        <br />
        {`accepts type 'a'`}
      </Droppable>
      <Droppable
        id={3}
        type="b"
        class="droppable"
        classAccept="!droppable-accept"
        classReject="!droppable-reject"
      >
        Droppable too
        <br />
        {`accepts type 'b'`}
      </Droppable>
    </DragDropProvider>
  );
};
export default ConditionalDropExample;
