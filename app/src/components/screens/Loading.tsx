import Spinner from "../icons/Spinner";
import Overlay from "./Overlay";

export default function Loading({
  show = false,
  onClick = console.log,
}) {
  return (
    <Overlay show={show}>
      <div
        className={"loading bg-gray-800 w-full min-h-full flex items-center justify-center"}
        onClick={onClick}
      >
        <Spinner />
      </div>
    </Overlay>
  );
}
