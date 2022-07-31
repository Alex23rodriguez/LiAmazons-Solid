import "./dnd.css";
import {
  DragDropProvider,
  DragDropSensors,
  createDraggable,
  createDroppable,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";
import { Component } from "solid-js";

const Draggable: Component = () => {
  const draggable = createDraggable(1);
  return (
    <div use:draggable class="draggable">
      Draggable
    </div>
  );
};

const Droppable: Component = () => {
  const droppable = createDroppable(1);
  return (
    <div
      use:droppable
      class="droppable"
      classList={{ "!droppable-accept": droppable.isActiveDroppable }}
    >
      Droppable.
    </div>
  );
};

const DragAndDropExample = () => {
  let ref: HTMLDivElement;

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (droppable) {
      droppable.node.append(draggable.node);
    } else {
      ref.append(draggable.node);
    }
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <DragDropSensors />
      <div ref={ref!} class="min-h-15">
        <Draggable />
      </div>
      <Droppable />
    </DragDropProvider>
  );
};

export default DragAndDropExample;
