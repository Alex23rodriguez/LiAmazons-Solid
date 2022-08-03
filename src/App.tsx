import { Singleplayer } from "./amazons/singleplayer";
import Anim from "./amazons/animation/index";

import { Checkerboard } from "./new_amazons/board";
import { DEFAULT_POSITIONS } from "amazons-game-engine";

export const App = () => (
  <>
    <Singleplayer />
    <Checkerboard fen={DEFAULT_POSITIONS[6]} />
    {/* <Anim /> */}
  </>
);

// export const App = () => <Anim />;
