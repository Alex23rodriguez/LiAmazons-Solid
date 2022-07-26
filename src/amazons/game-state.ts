import { Amazons } from "amazons-game-engine";
import { createSignal } from "solid-js";

export const [amazons, setAmazons] = createSignal(Amazons(6));
