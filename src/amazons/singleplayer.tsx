/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

// import ChessBoard from './board';
// import { Client } from "boardgame.io/client";
import { Client } from "boardgame.io/client";
import { AmazonsBoard } from "./board";
import { AmazonsGame } from "./game";

class AmazonsClient {
  public client: any;
  constructor() {
    this.client = Client({ game: AmazonsGame, debug: true });
    this.client.start();
  }
}

const app = new AmazonsClient();

export const Singleplayer = () => (
  <div style={{ padding: 50 }}>hello im Singleplayer</div>
);

// import logo from "./logo.svg";
// import styles from "./App.module.css";
