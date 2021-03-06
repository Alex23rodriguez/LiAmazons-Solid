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

const AmazonsClient = () => {
  const client = Client({ game: AmazonsGame, debug: false });
  client.start();
  (window as any).client = client;

  return <AmazonsBoard client={client} />;
};

export const Singleplayer = () => (
  <div style={{ padding: 50 }}>
    <AmazonsClient />
  </div>
);
