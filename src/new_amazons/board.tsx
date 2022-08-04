import { Amazons, coords_to_square } from "amazons-game-engine";
import { FEN, Size, Square as TSquare } from "amazons-game-engine/dist/types";
import { createSignal, ParentComponent, Signal, For, Index } from "solid-js";
import { Arrow } from "./arrow";
import { Queen } from "./queen";
import { colorPalette } from "./settings";
import { Square } from "./square";

export const Checkerboard: ParentComponent<{ fen: FEN }> = (props) => {
  const amz = Amazons(props.fen);
  const size = amz.size();
  const { rows, cols } = size;
  const square_names = Array.from({ length: cols * rows }, (_, i) =>
    index_to_square(i, size)
  );

  const board_size = "min(80vh, 80vw)";
  const square_size = `calc(${board_size} / ${cols})`;

  const pieces: { [piece: string]: Signal<TSquare>[] } = {
    b: [],
    w: [],
    x: [],
  };

  (window as any).pieces = pieces;

  for (let [piece, squares] of Object.entries(amz.pieces())) {
    for (let sq of squares) pieces[piece].push(createSignal(sq));
  }

  const [selected, setSelected] = createSignal<TSquare | null>(null);
  const onClick = (sq: TSquare) => {
    console.log(sq);
    setSelected(sq);
  };

  return (
    <div
      id="board"
      class="select-none grid"
      style={{
        width: board_size,
        "grid-template-columns": `repeat(${cols}, 1fr)`,
      }}
    >
      {Object.entries(pieces).map(([piece, sig_array]) =>
        piece === "x" ? (
          <For each={sig_array}>
            {(sig) => <Arrow size={square_size} square={sig[0]()} />}
          </For>
        ) : (
          <For each={sig_array}>
            {(sig) => (
              <Queen
                square={sig[0]()}
                team={piece}
                size={square_size}
                onClick={onClick}
              />
            )}
          </For>
        )
      )}
      {square_names.map((sq) => (
        <Square
          canMove={sq === "b1"}
          square={sq}
          color={colorPalette()[amz.square_color(sq)]}
          onClick={onClick}
        />
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
