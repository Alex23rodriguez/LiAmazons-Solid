import { createSignal } from "solid-js";

export const [colorPalette, setColorPalette] = createSignal<{
  [key: string]: string;
}>(
  {
    light: "beige",
    dark: "gray",
    w: "white",
    b: "red",
    arrow: "black",
    light_h: "yellow",
    dark_n: "yellow",
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
