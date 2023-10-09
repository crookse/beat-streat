import { ReactNode } from "react";

export default function ZIndexed({
  bringToFront,
  children,
}: {
  bringToFront: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={"w-full h-full z-20 " +
        (!bringToFront && "z-0 pointer-events-none")}
    >
      {children}
    </div>
  );
}
