import type { Component } from "solid-js";
import { Client } from "boardgame.io/client";
import { AmazonsGame } from "./amazons/singleplayer";

// import logo from "./logo.svg";
// import styles from "./App.module.css";

class AmazonsClient {
  public client;
  constructor() {
    this.client = Client({ game: AmazonsGame, debug: true });
    this.client.start();
  }
}

const app = new AmazonsClient();

// const App: Component = () => {
//   return (
//     <div class={styles.App}>
//       <header class={styles.header}>
//         {/* <img src={logo} class={styles.logo} alt="logo" /> */}
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           class={styles.link}
//           href="https://github.com/solidjs/solid"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn Solid
//         </a>
//       </header>
//     </div>
//   );
// };
//
// export default App;
