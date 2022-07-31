import "./dnd.css";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  createDraggable,
  createDroppable,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";

// notice that, when moving the draggable, a shadow stays behind

const Draggable = () => {
  const draggable = createDraggable(1);
  return (
    <div
      use:draggable
      class="draggable"
      classList={{ "opacity-25": draggable.isActiveDraggable }}
    >
      Draggable
    </div>
  );
};

const Droppable = () => {
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

const DragOverlayExample = () => {
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
      <DragOverlay>
        <div class="draggable">Drag overlay!</div>
      </DragOverlay>
    </DragDropProvider>
  );
};
export default DragOverlayExample;
