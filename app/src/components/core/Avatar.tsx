export default function Avatar({
  onClick = () => console.log("Not implemented"),
}) {
  return (
    <button
      className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none"
      onClick={onClick}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">
        Open user menu
      </span>
      <img
        className="h-8 w-8 rounded-full"
        src={"/teo.jpeg"}
        alt=""
      />
    </button>
  );
}
