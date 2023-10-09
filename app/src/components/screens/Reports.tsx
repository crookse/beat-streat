import ListTable from "../tables/ListTable";

export default function Report({
  wallet,
  reports = [],
}: {
  wallet?: any;
  reports?: string[];
}) {
  return (
    <div className="flex md:max-w-2xl md:mx-auto w-full">
      <div className="p-10 flex flex-col w-full items-center">
        <h1 className="font-bold text-2xl md:text-3xl mb-10">
          Reports
        </h1>
        <ListTable />
      </div>
    </div>
  );
}
