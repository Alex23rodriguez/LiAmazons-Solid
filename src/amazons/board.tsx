import { Amazons } from "amazons-game-engine";
import { Coords } from "amazons-game-engine/dist/types";
import { amazons } from "./game-state";

export function AmazonsBoard({ ctx, moves }: any) {
  const onClick = (coords: Coords) => moves.random_move();

  let amz = amazons();
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

  let { rows, cols } = amz.size();
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
