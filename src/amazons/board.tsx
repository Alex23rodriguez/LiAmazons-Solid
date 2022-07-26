import { Amazons } from "amazons-game-engine";
import { Coords } from "amazons-game-engine/dist/types";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { createSignal } from "solid-js";

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
  };

  const amazons = Amazons(initG.fen);
  (window as any).amazons = amazons;

  const cellStyle = {
    border: "1px solid #555",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
  };

  let { rows, cols } = amazons.size();
  let tbody = [];
  for (let row = 0; row < rows; row++) {
    let cells = [];
    for (let col = 0; col < cols; col++) {
      cells.push(
        <td>
          {false ? (
            <div style={cellStyle}>{1}</div>
          ) : (
            <button style={cellStyle} onClick={() => onClick({ row, col })} />
          )}
        </td>
      );
    }
    tbody.push(<tr>{cells}</tr>);
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {ctx().gameover ? (
        <div id="winner">Winner: {amazons.turn(true)}</div>
      ) : (
        ""
      )}
    </div>
  );
}
