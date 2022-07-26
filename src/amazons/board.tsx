import { Amazons } from "amazons-game-engine";
import { Coords } from "amazons-game-engine/dist/types";

export function AmazonsBoard({ ctx, G, moves }: any) {
  const onClick = (coords: Coords) => moves.random_move();

  const amazons = Amazons(G.fen);
  let winner: any = "";
  if (ctx.gameover) {
    winner = <div id="winner">Winner: {ctx.gameover.winner}</div>;
  }

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
      {winner}
    </div>
  );
}
