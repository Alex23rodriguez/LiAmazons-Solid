import "./queen.scss";

export const Queen = (props: { team: string }) => (
  <div class="container">
    <div class={`inner-circle large ${props.team}`}></div>
    <div class="inner-circle small"></div>
  </div>
);
