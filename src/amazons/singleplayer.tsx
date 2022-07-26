/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

// import ChessBoard from './board';
// import { Client } from "boardgame.io/client";
import { Client } from "boardgame.io/react";
import { AmazonsBoard } from "./board";
import { AmazonsGame } from "./game";

const App: any = Client({
  game: AmazonsGame,
  board: AmazonsBoard,
});

const Singleplayer = () => (
  <div style={{ padding: 50 }}>
    <App />
  </div>
);

export default Singleplayer;

// import logo from "./logo.svg";
// import styles from "./App.module.css";
