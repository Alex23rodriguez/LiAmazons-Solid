import { Square } from "./square";

import { createSignal } from "solid-js";
import {
  Amazons,
  coords_to_square,
  square_to_coords,
} from "amazons-game-engine";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { Square as TSquare } from "amazons-game-engine/dist/types";

export const AmazonsBoard = (props: { client: _ClientImpl }) => {
  // state
  const [turn, setTurn] = createSignal(0);
  const [queens, setQueens] = createSignal<[number[], number[]]>([[], []]);
  const [arrows, setArrows] = createSignal<number[]>([]);
  const [selected, setSelected] = createSignal<number | null>(null);
  const [canMove, setCanMove] = createSignal<number[]>([]);
  const [highlight, setHighlight] = createSignal<number[]>([]);

  const amazons = Amazons();

  console.log("init board");
  (window as any).amazons = amazons;

  let size = amazons.size();
  const { rows, cols } = size;

  function index_to_square(index: number) {
    return coords_to_square(
      { row: Math.floor(index / size.cols), col: index % size.cols },
      size
    );
  }

  function square_to_index(square: TSquare) {
    let { row, col } = square_to_coords(square, size);
    return row * size.cols + col;
  }

  function callSetPieces() {
    setQueens([
      amazons.pieces()["w"].map(square_to_index),
      amazons.pieces()["b"].map(square_to_index),
    ]);
    setArrows(amazons.pieces()["x"].map(square_to_index));
  }
  callSetPieces();

  let makeClickHandler = (i: number) => () => {
    let clicked_square = index_to_square(i);

    // TODO: choose based on amazons API
    if (queens()[turn()].includes(i) && highlight().length !== 2) {
      // click on queen
      setSelected(i);

      let poss_squares = amazons.moves_dict()[clicked_square];
      if (typeof poss_squares === "undefined") setCanMove([]);
      else setCanMove(poss_squares.map((sq) => square_to_index(sq)));
      setHighlight([i]);
      return;
    }
    // click on canMove
    if (canMove().includes(i) && selected() !== null) {
      // update amazons
      amazons.move([index_to_square(selected() as number), clicked_square]);
      callSetPieces();
      // setQueens(qns);
      setHighlight([selected() as number, i]);
      setSelected(null);

      let poss_squares = amazons.moves().flat();
      setCanMove(
        Object.keys(poss_squares).map((sq) => square_to_index(sq as TSquare))
      );

      return;
    } // place arrow
    if (canMove().includes(i) && selected() === undefined) {
      let h = Array.from(highlight());
      h.push(i);
      amazons.move([clicked_square]);
      callSetPieces();

      // setArrows(arrows().concat(i));
      setCanMove([]);
      setTurn(1 - turn());
      setHighlight(h);
      return;
    }
  };

  let square_height = `calc(80vw / ${cols})`;
  let squares = [];
  for (let i = 0; i < cols * rows; i++) {
    console.log("loaded all the squares");
    let sq_name = index_to_square(i);
    squares.push(
      <Square
        height={square_height}
        color={
          (highlight().includes(i) ? "H" : "") +
          (amazons.square_color(sq_name) === "light" ? 0 : 1)
        }
        queen={queens()[0].includes(i) ? 1 : queens()[1].includes(i) ? 2 : 0}
        arrow={arrows().includes(i) ? true : false}
        onClick={makeClickHandler(i)}
        canMove={canMove().includes(i) ? true : false}
      />
    );
  }

  return (
    <div
      style={{
        display: "grid",
        "grid-template-columns": `repeat(${cols}, ${square_height})`,
      }}
    >
      {squares}
    </div>
  );
};
