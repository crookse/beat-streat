import { ReactNode, useState } from "react";
import { classNames } from "../../utils/classNames";

export type NavItem = {
  display_name: string;
  screen_key: string;
  mobile_icon: ReactNode;
};

export default function Nav({
  clearSelected = false,
  avatar,
  navItems,
  onChangeNavItem = (_currentNavItem) => console.log(`Not implemented`),
}: {
  clearSelected?: boolean;
  avatar: () => JSX.Element | null;
  enableLogin?: boolean;
  hasNewMessages?: boolean;
  navItems: NavItem[];
  onChangeNavItem?: (currentNavItem: NavItem) => void;
}) {
  const [currentNavItem, setCurrentNavItem] = useState<null | NavItem>(
    navItems[0],
  );

  return (
    <div className="px-4 bg-gray-800">
      <div className="flex h-16 md:items-center justify-between">
        <div className="logo flex items-center mr-0 md:mr-10">
          <img
            className="h-8 w-8"
            src="/patch-64-white.png"
            alt="BeatStret"
          />
        </div>

        <div className="nav-items flex md:flex-grow flex-start py-[6px] space-x-2">
          {navItems.map((item) => (
            <button
              key={item.display_name}
              className={classNames(
                !clearSelected && currentNavItem?.display_name ===
                    item.display_name
                  ? "bg-slate-200 text-slate-800"
                  : "text-slate-100 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-1 text-sm font-medium",
              )}
              aria-current={currentNavItem?.display_name ===
                  item.display_name
                ? "page"
                : undefined}
              onClick={() => {
                setCurrentNavItem(item);
                onChangeNavItem(item);
              }}
              style={{
                minWidth: 40,
              }}
            >
              <span className="hidden md:inline-block">
                {item.display_name}
              </span>
              <span
                className="md:hidden inline-block flex flex-col items-center text-xs"
                style={{ width: 40 }}
              >
                {item.mobile_icon}
                <span className="inline-block text-[11px] font-bold">
                  {item.display_name}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="avatar flex">
          {avatar()}
        </div>
      </div>
    </div>
  );
}
