import { coords_to_square } from "amazons-game-engine";
import { Size, Square as TSquare } from "amazons-game-engine/dist/types";
import { JSX } from "solid-js/jsx-runtime";

export const Checkerboard = ({
  size,
  width,
  colorFunc,
}: {
  size: Size;
  width: string;
  colorFunc: (sq: `${string}${number}`) => "dark" | "light";
}) => {
  let square_width = `calc(${width} / ${size.cols})`;

  let style = {
    display: "grid",
    "grid-template-columns": Array(size.cols).fill(square_width).join(" "), //`repeat(${size.cols}), ${square_width}`,
  } as JSX.CSSProperties;

  let squares: { [sq: `${string}${number}`]: JSX.Element } = {};
  let order: TSquare[] = [];

  for (let row = 0; row < size.rows; row++) {
    for (let col = 0; col < size.rows; col++) {
      let sq = coords_to_square({ col, row }, size);
      order.push(sq);
      squares[sq] = (
        <Square
          color={colors[colorFunc(sq)]}
          name={sq}
          token={null}
          width={square_width}
        />
      );
    }
  }

  return <div style={style}>{order.map((sq) => squares[sq])}</div>;
};

const colors = {
  light: "lightgray",
  dark: "gray",
  hlight: "blue",
  hdark: "red",
};

const Square = ({
  color,
  name,
  token,
  width,
}: {
  color: string;
  name: TSquare;
  token?: any;
  width: string;
}) => {
  console.log(width);

  let style = {
    "background-color": color,
    "min-width": width,
    "min-height": width,
    position: "relative",
  } as JSX.CSSProperties;

  return <div style={style}>{name}</div>;
};
