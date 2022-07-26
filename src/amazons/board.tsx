import { Amazons, square_to_coords } from "amazons-game-engine";
import { Coords, Square } from "amazons-game-engine/dist/types";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { createMemo, createSignal } from "solid-js";

export function AmazonsBoard({ client }: { client: _ClientImpl }) {
  const { moves } = client;
  let { G: initG, ctx: initCtx } = client.getState() as any;

  const [G, setG] = createSignal(initG);
  const [ctx, setCtx] = createSignal(initCtx);

  client.subscribe((state) => {
    let { G: newG, ctx: newCtx } = state as any;
    setG(newG);
    setCtx(newCtx);
  });

  const onClick = (coords: Coords) => {
    moves.random_move();
    amazons.load(G().fen);
    // amazons.move(G().last_move);
    setPieces(amazons.pieces());
  };

  const amazons = Amazons(initG.fen);
  (window as any).amazons = amazons;
  const [pieces, setPieces] = createSignal(amazons.pieces());

  const cellStyle = {
    border: "1px solid #555",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
  };

  let { rows, cols } = amazons.size();

  const tbody = createMemo(() => {
    let all_cells = [];
    for (let row = 0; row < rows; row++) {
      let cells = [];
      for (let col = 0; col < cols; col++) {
        cells.push(
          <td>
            <button style={cellStyle} onClick={() => onClick({ row, col })} />
          </td>
        );
      }

      all_cells.push(cells);
    }

    // draw pieces
    for (const [p, sqs] of Object.entries(pieces())) {
      for (let sq of sqs) {
        let { row, col } = square_to_coords(sq as Square, amazons.size());

        all_cells[row][col] = (
          <td>
            <div style={cellStyle}>{p}</div>
          </td>
        );
      }
    }

    let tbody = [];
    for (const cells of all_cells) {
      tbody.push(<tr>{cells}</tr>);
    }
    return tbody;
  });

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {ctx().gameover ? <div id="winner">Winner: {ctx().gameover}</div> : ""}
    </div>
  );
}
