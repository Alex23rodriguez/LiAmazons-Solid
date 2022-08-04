import { createSignal } from "solid-js";

export const [colorPalette, setColorPalette] = createSignal<{
  [key: string]: string;
}>(
  {
    light: "beige",
    dark: "#16a34a",
    w: "white",
    b: "slateblue",
    canMove: "black",
    canMoveShooting: "red",
    arrow: "black",
    light_h: "yellow",
    dark_h: "yellow",
  },
  { equals: false }
);

(window as any).colorP = colorPalette;
export const setColor = (k: string, v: string) => {
  const cp = colorPalette();
  cp[k] = v;
  setColorPalette(cp);
};
(window as any).setColor = setColor;
