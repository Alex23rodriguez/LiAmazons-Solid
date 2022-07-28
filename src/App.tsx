import DnD from "./dnd/vertical-list";

export const App = DnD;
// export const App = () => <Singleplayer />;

// import { Client } from "boardgame.io/client";
// import { AmazonsGame } from "./amazons/game";

// import logo from "./logo.svg";
// import styles from "./App.module.css";

// class AmazonsClient {
//   public client;
//   constructor() {
//     this.client = Client({ game: AmazonsGame, debug: true });
//     this.client.start();
//   }
// }
//
// const app = new AmazonsClient();

// import { Router } from "solid-app-router";
// import _ from "lodash";
// import LiNavLink from "./li-navlink";

// import routes from "./routes";
// import "./app.css";

// CSS for the sidebar is taken from vue.css
// export const App = () => (
//   <Router>
//     <main>
//       <aside className="sidebar">
//         <div className="sidebar-nav" style={{ height: "90%" }}>
//           <ul>
//             {routes.map((route_category, idx) => (
//               <li key={idx}>
//                 <p>{route_category.name}</p>
//                 <ul>
//                   {route_category.routes.map((route, _idx) => (
//                     <LiNavLink
//                       key={`${idx}.${_idx}`}
//                       to={route.path}
//                       exact={true}
//                       activeClassName="active"
//                     >
//                       {route.text}
//                     </LiNavLink>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </aside>
//       <section className="content">
//         {_.flattenDeep(routes.map((route) => route.routes)).map(
//           (route, idx) => (
//             <Route
//               key={idx}
//               exact
//               path={route.path}
//               component={route.component}
//             />
//           )
//         )}
//       </section>
//     </main>
//   </Router>
// );
