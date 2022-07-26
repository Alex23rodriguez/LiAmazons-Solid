import { coords_to_square } from "amazons-game-engine";
import { Size, Square as TSquare } from "amazons-game-engine/dist/types";
import { createMemo } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

export const Checkerboard = (props: {
  size: Size;
  width: string;
  colorFunc: (sq: `${string}${number}`) => "dark" | "light";
  pieces: { [sq: `${string}${number}`]: string };
  onClick: (square: TSquare) => void;
}) => {
  let { size, width, colorFunc, onClick } = props;
  let square_width = `calc(${width} / ${size.cols})`;

  let style = {
    display: "grid",
    "grid-template-columns": Array(size.cols).fill(square_width).join(" "), //`repeat(${size.cols}), ${square_width}`,
  } as JSX.CSSProperties;

  let order: TSquare[] = [];

  for (let row = 0; row < size.rows; row++)
    for (let col = 0; col < size.rows; col++)
      order.push(coords_to_square({ col, row }, size));

  let squares = createMemo(() => {
    let squares: { [sq: `${string}${number}`]: JSX.Element } = {};
    for (let sq of order) {
      let piece = props.pieces[sq];
      squares[sq] = (
        <Square
          onClick={onClick}
          color={colors[colorFunc(sq)]}
          name={sq}
          width={square_width}
        >
          {piece}
        </Square>
      );
    }
    return squares;
  });

  return <div style={style}>{order.map((sq) => squares()[sq])}</div>;
};

const colors = {
  light: "lightgray",
  dark: "gray",
  hlight: "blue",
  hdark: "red",
};

const Square = (props: {
  color: string;
  name: TSquare;
  children?: any;
  width: string;
  onClick: any;
}) => {
  let { color, name, width, onClick } = props;

  let style = {
    "background-color": color,
    "min-width": width,
    "min-height": width,
    position: "relative",
  } as JSX.CSSProperties;

  return (
    <div style={style} onClick={() => onClick(name)}>
      {/* {name} */}

      {props.children}
    </div>
  );
};
