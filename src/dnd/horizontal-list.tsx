import "./dnd.css";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
  DragEventHandler,
} from "@thisbeyond/solid-dnd";
import { createSignal, For, ParentComponent } from "solid-js";

const Sortable: ParentComponent<{ item: number }> = (props) => {
  const sortable = createSortable(props.item);
  return (
    <div
      use:sortable
      class="sortable"
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      {props.item}
    </div>
  );
};

export const SortableHorizontalListExample = () => {
  const [items, setItems] = createSignal([1, 2, 3]);
  const [activeItem, setActiveItem] = createSignal<number | null>(null);
  const ids = () => items();

  const onDragStart: DragEventHandler = ({ draggable }) =>
    setActiveItem(draggable.id as number);

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id as number);
      const toIndex = currentItems.indexOf(droppable.id as number);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
    setActiveItem(null);
  };

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />
      <div class="column grid-flow-col self-stretch">
        <SortableProvider ids={ids()}>
          <For each={items()}>{(item) => <Sortable item={item} />}</For>
        </SortableProvider>
      </div>
      <DragOverlay>
        <div class="sortable">{activeItem()}</div>
      </DragOverlay>
    </DragDropProvider>
  );
};
export default SortableHorizontalListExample;
