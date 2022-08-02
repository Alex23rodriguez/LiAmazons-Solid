export const Movable = (props: { shooting: boolean }) => {
  return (
    <div
      class="inner-circle w-1/5 h-1/5 opacity-30"
      classList={{ "bg-red-700": props.shooting, "bg-black": !props.shooting }}
    />
  );
};
