import { Transition } from "solid-transition-group";

// simple CSS animation
const Example1 = () => (
  <Transition name="slide-fade">{/*show() &&*/ <div>Hello</div>}</Transition>
);

// JS Animation

const Example2 = () => (
  <Transition
    onEnter={(el, done) => {
      const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 600,
      });
      a.finished.then(done);
    }}
    onExit={(el, done) => {
      const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 600,
      });
      a.finished.then(done);
    }}
  >
    {/*show() &&*/ <div>Hello</div>}
  </Transition>
);

export default Example1;
