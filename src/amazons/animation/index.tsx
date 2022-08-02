import "./styles.css";

import { createSignal, For, Match, Switch } from "solid-js";
import { Transition, TransitionGroup } from "solid-transition-group";
import { Button } from "../../components/button";

function shuffle(array: number[]) {
  return array.sort(() => Math.random() - 0.5);
}
let nextId = 10;

const Example = () => {
  const [show, toggleShow] = createSignal(true),
    [select, setSelect] = createSignal(0),
    [numList, setNumList] = createSignal([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    randomIndex = () => Math.floor(Math.random() * numList().length);

  return (
    <>
      <Button onClick={() => toggleShow(!show())}>
        {show() ? "Hide" : "Show"}
      </Button>
      <br />
      <b>Transition:</b>
      <Transition name="slide-fade">
        {show() && (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            facilisis enim libero, at lacinia diam fermentum id. Pellentesque
            habitant morbi tristique senectus et netus.
          </div>
        )}
      </Transition>
      <br />
      <b>Animation:</b>
      <Transition name="bounce">
        {show() && (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            facilisis enim libero, at lacinia diam fermentum id. Pellentesque
            habitant morbi tristique senectus et netus.
          </div>
        )}
      </Transition>
      <br />
      <b>Custom JS:</b>
      <Transition
        onBeforeEnter={(el) => {
          el.style.opacity = "0";
        }}
        onEnter={(el, done) => {
          const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 600,
          });
          a.finished.then(done);
        }}
        onAfterEnter={(el) => (el.style.opacity = "1")}
        onExit={(el, done) => {
          const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 600,
          });
          a.finished.then(done);
        }}
      >
        {show() && (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            facilisis enim libero, at lacinia diam fermentum id. Pellentesque
            habitant morbi tristique senectus et netus.
          </div>
        )}
      </Transition>
      <br />
      <b>Switch OutIn</b>
      <br />
      <Button onClick={() => setSelect((select() + 1) % 3)}>Next</Button>
      <Transition name="fade" mode="outin">
        <Switch>
          <Match when={select() === 0}>
            <p class="container">The First</p>
          </Match>
          <Match when={select() === 1}>
            <p class="container">The Second</p>
          </Match>
          <Match when={select() === 2}>
            <p class="container">The Third</p>
          </Match>
        </Switch>
      </Transition>
      <b>Group</b>
      <br />
      <Button
        onClick={() => {
          const list = numList(),
            idx = randomIndex();
          setNumList([...list.slice(0, idx), nextId++, ...list.slice(idx)]);
        }}
      >
        Add
      </Button>
      <Button
        onClick={() => {
          const list = numList(),
            idx = randomIndex();
          setNumList([...list.slice(0, idx), ...list.slice(idx + 1)]);
        }}
      >
        Remove
      </Button>
      <Button
        onClick={() => {
          const randomList = shuffle(numList().slice());
          setNumList(randomList);
        }}
      >
        Shuffle
      </Button>
      <br />
      <TransitionGroup name="list-item">
        <For each={numList()}>{(r) => <span class="list-item">{r}</span>}</For>
      </TransitionGroup>
    </>
  );
};

export default Example;
