import { Component } from "solid-js";
import { colorPalette } from "./settings";

export const Arrow: Component<{ size: string }> = (props) => (
  <div
    class="absolute z-10 grid place-items-center"
    style={{ width: props.size, height: props.size }}
  >
    <div
      class="absolute w-1/2 h-1/2 rounded-full"
      style={{ "background-color": colorPalette()["arrow"] }}
    />
  </div>
);
