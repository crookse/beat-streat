import { Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

export default function Overlay({
  children,
  show = false,
}: {
  children: ReactNode;
  show?: boolean;
}) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-250"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-250"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      show={show}
    >
      <div
        className={"fixed top-0 left-0 bg-gray-800 w-full min-h-full flex items-center justify-center z-50"}
      >
        {children}
      </div>
    </Transition>
  );
}
