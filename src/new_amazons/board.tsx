import { Amazons, coords_to_square } from "amazons-game-engine";
import { FEN, Size, Square as TSquare } from "amazons-game-engine/dist/types";
import { createSignal, ParentComponent, Signal, For, Index } from "solid-js";
import { Square } from "./square";

export const Checkerboard: ParentComponent<{ fen: FEN; settings: any }> = (
  props
) => {
  const amz = Amazons(props.fen);
  const size = amz.size();
  const { rows, cols } = size;
  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    index_to_square(i, size)
  );

  const board_size = `calc(min(80vh, 80vw))`;

  const pieces: { [piece: string]: Signal<TSquare>[] } = {
    b: [],
    w: [],
    x: [],
  };

  for (let [piece, squares] of Object.entries(amz.pieces())) {
    for (let sq of squares) pieces[piece].push(createSignal(sq));
  }

  return (
    <div
      id="board"
      class="select-none grid"
      style={{
        width: board_size,
        "grid-template-columns": `repeat(${cols}, 1fr)`,
      }}
    >
      {square_names.map((sq) => (
        <Square name={sq} color={props.settings.color[amz.square_color(sq)]} />
      ))}
    </div>
  );
};

function index_to_square(index: number, size: Size) {
  return coords_to_square(
    {
      row: Math.floor(index / size.cols),
      col: index % size.cols,
    },
    size
  );
}
