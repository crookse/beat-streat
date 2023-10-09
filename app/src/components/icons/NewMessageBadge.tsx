export default function NewMessageBadge({
  show = false,
}: {
  show?: boolean;
}) {
  if (!show) {
    return null;
  }

  return (
    <span className="flex h-4 w-4 absolute inline-block -top-2 -right-1 z-10">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 border">
      </span>
      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500">
      </span>
    </span>
  );
}
