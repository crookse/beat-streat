import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useConnection } from "arweave-wallet-kit";

import { LoginButton, OthentLogin } from "@othent/react-components";

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Onboarding({
  onFinished = console.log,
}: {
  onFinished: () => void;
}) {
  return <></>;

  // return (
  //   <div className="flex justify-center flex-col w-full px-2 py-16">
  //     <Tab.Group>
  //       <Tab.Panels className="flex w-full h-full">
  //           <Tab.Panel
  //             className={classNames(
  //               "rounded-xl bg-white p-3 w-full",
  //               "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
  //             )}
  //           >
  //           </Tab.Panel>
  //       </Tab.Panels>
  //       <div className="fixed w-full bottom-0 left-0 p-3">
  //         <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
  //           {[
  //             "Setup",

  //           ].map((category) => (
  //             <Tab
  //               key={category}
  //               className={({ selected }) =>
  //                 classNames(
  //                   "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
  //                   "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
  //                   selected
  //                     ? "bg-white shadow"
  //                     : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
  //                 )}
  //             >
  //               {category}
  //             </Tab>
  //           ))}
  //         </Tab.List>
  //         </div>
  //     </Tab.Group>
  //   </div>
  // );
}
