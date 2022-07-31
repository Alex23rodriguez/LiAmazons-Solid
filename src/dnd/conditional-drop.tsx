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

const Draggable: ParentComponent<{ id: string | number; type: string }> = (
  props
) => {
  const draggable = createDraggable(props.id, { type: props.type });
  return (
    <div use:draggable class="draggable">
      {`Draggable type '${props.type}'`}
    </div>
  );
};

const Droppable: ParentComponent<{ id: string | number; type: string }> = (
  props
) => {
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
    return "";
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
  let ref: HTMLDivElement;

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (droppable) {
      if (draggable.data.type === droppable.data.type) {
        droppable.node.append(draggable.node);
      }
    } else {
      ref.append(draggable.node);
    }
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />
      <div ref={ref!} class="min-h-15 flex flex-wrap gap-5 justify-center">
        <Draggable id={1} type="a" />
        <Draggable id={2} type="b" />
      </div>
      <Droppable id={1} type="a" />
      <Droppable id={2} type="b" />
    </DragDropProvider>
  );
};
export default ConditionalDropExample;
