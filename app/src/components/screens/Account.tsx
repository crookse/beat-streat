import { useEffect, useState } from "react";

export default function Account({
  wallet,
}: {
  wallet?: any;
}) {
  const fields = [
    {
      key: "Name",
      value: wallet.name,
    },
    {
      key: "Email",
      value: wallet.email,
    },
  ];

  const [balance, setBalance] = useState("0");
  const [balanceError, setBalanceError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const a = await fetch("http://localhost:4242/balance");
        setBalance(await a.text());
      } catch (error) {
        setBalanceError(true);
      }
    })();
  });

  return (
    <div className="flex md:max-w-2xl md:mx-auto w-full">
      <div className="p-10 flex flex-col w-full items-center">
        <h1 className="font-bold text-2xl md:text-3xl mb-10">
          Account Information
        </h1>
        <div className="flex flex-col items-center w-full mb-5">
          <img
            className="h-24 w-24 rounded-full bg-gray-50 mb-1"
            src="/teo.jpeg"
            alt=""
          />
          <p className="text-sm font-bold">Edit</p>
        </div>
        <h2 className="mt-10 font-bold text-md mb-1">Othent Account</h2>
        <p className="mb-4 text-xs">
          This data is not stored in Arweave
        </p>
        <div className="flex p-4 bg-slate-200 flex-col gap-5 w-full text-xs rounded-md">
          {fields.map((field, index) => (
            <div
              key={JSON.stringify(field) + index}
              className="flex w-full items-center border-t border-1 border-slate-300 pt-4 first-of-type:pt-0 first-of-type:border-none"
            >
              <div className="w-2/5 font-bold">{field.key}</div>
              <div className="text-right w-3/5">
                {typeof field.value === "function"
                  ? <field.value />
                  : field.value}
              </div>
            </div>
          ))}
        </div>
        <h2 className="mt-10 font-bold text-md mb-3">
          Arweave Account
        </h2>
        <div className="flex p-4 bg-slate-200 flex-col gap-5 w-full text-xs rounded-md">
          <div className="flex flex-col w-full border-t border-1 border-slate-300 pt-4 first-of-type:pt-0 first-of-type:border-none">
            <div className="flex w-full items-center border-b border-1 border-slate-300 pb-4 mb-3">
              <div className="w-2/5 font-bold">Balance</div>
              <div className="text-right w-3/5">
                {balanceError && ("Issue connecting to server")}
                {!balanceError &&
                  (balance === "0" ? "Loading ..." : balance + " AR")}
              </div>
            </div>
            <div className="w-full font-bold mb-2">
              Arweave Transaction ID
            </div>
            <pre className="rounded-md bg-slate-100 border mb-1 border-slate-300 text-slate-800 p-3 w-full overflow-auto">{wallet.contract_id}</pre>
            <p className="mb-5 text-xs text-slate-700">
              This is your Othent account ID in the Arweave system
            </p>
            <div className="text-right w-full">
              <a
                className="px-2 py-1 font-bold bg-slate-500 text-slate-100 rounded-md"
                target="_BLANK"
                rel="noreferrer"
                href="https://viewblock.io/arweave/tx/535zBjR5D41Zsf7PM3j_qqmRE9e4bSVn6mX5NxT9S90"
              >
                View In Arweave
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pb-10 text-xs text-center">
          Powered by Othent and Arweave
        </div>
      </div>
    </div>
  );
}
