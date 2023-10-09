import { ReactNode } from "react";

export default function Layout({
  navBar,
  main,
}: {
  navBar: ReactNode;
  main: ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Top nav bar is shown for desktop screens */}
      <div className="fixed bottom-0 left-0 md:static md:block w-full z-40">
        {navBar}
      </div>

      <main className="flex flex-1 w-full overflow-auto">
        {main}
      </main>
    </div>
  );
}
