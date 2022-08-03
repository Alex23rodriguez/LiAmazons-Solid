import { square_to_coords } from "amazons-game-engine";
import { Square } from "amazons-game-engine/dist/types";

export function makeTransform(sq: Square) {
  const { row, col } = square_to_coords(sq, { rows: 6, cols: 6 });

  const ans = `translate3d(${col === 0 ? "0" : col + "00%"}, ${
    row === 0 ? "0" : row + "00%"
  }, 0)`;
  return ans;
}
