import "./movable.css";

export const Movable = (props: { shooting: boolean }) => {
  return <div class="movable" classList={{ shooting: props.shooting }} />;
};
