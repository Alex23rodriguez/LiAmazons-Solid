import "./queen.scss";

const Queen = (props) => (
  <div class="container">
    <div class={`inner-circle large ${props.team}`}></div>
    <div class="inner-circle small"></div>
  </div>
);

export default Queen;
