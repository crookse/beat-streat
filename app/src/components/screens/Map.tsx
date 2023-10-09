import { useEffect, useState } from "react";
import W3WMap from "../maps/W3WMap";
import Spinner from "../icons/Spinner";
import Modal from "../core/Modal";
import MapMarker from "../icons/MapMarker";

export default function Map({
  wallet,
  enable = false,
  onReported = console.log,
}: {
  wallet?: any;
  enable?: boolean;
  onReported?: (a: any) => void;
}) {
  const [loading, setLoading] = useState<boolean>(enable);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<string>("opacity-0");
  const [selectedSquare, setSelectedSquare] = useState<any>({});

  useEffect(() => {
    if (loading) {
      setOpacity("opacity-0");
      return;
    }

    // Delay because the map needs time to apply its overlay
    setTimeout(() => {
      setOpacity("opacity-100");
    }, 1000);
  }, [
    loading,
    setOpacity,
  ]);

  const report = async () => {
    const res = await fetch("http://localhost:4242/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        wallet,
      }),
    });

    const body = await res.json();

    onReported(body);
  };

  return (
    <>
      <div
        className={"fixed top-0 left-0 z-10 w-full h-full flex justify-center transition-opacity " +
          (!loading && " opacity-0 pointer-events-none")}
      >
        <div className="flex items-center">
          <Spinner fill="fill-slate-500 opacity-50" />
        </div>
      </div>
      <div
        className={"overflow-hidden flex w-full h-full transition-opacity " +
          opacity}
      >
        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          title={"Report Current Marker?"}
        >
          <p className="text-base b-8 mb-5">
            You are about to submit the following information to the RoadForge
            system. Please verify this information is correct before submitting.
          </p>
          {selectedSquare && selectedSquare.detail && (
            <div className="border p-5 rounded-md border-slate-200 flex flex-col w-full items-center">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50 mb-10"
                src="/teo.jpeg"
                alt=""
              />
              <div className="flex flex-col gap-5 w-full text-xs">
                <div className="flex w-full justify-between items-center">
                  <div className="w-1/5 font-bold">User</div>
                  <div className="rounded bg-slate-200 p-2 text-right w-4/5">
                    {selectedSquare.detail.words}
                  </div>
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="w-1/5 font-bold">
                    Location
                  </div>
                  <div className="rounded bg-slate-200 p-2 text-right w-4/5">
                    {selectedSquare.detail.words}
                  </div>
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="w-1/5 font-bold">Fee</div>
                  <div className="rounded bg-slate-200 p-2 text-right w-4/5">
                    0.000000000001 AR
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full justify-between mt-5">
            <button
              className="rounded-md font-bold text-sm bg-gray-50 px-3 py-2 text-gray-100 bg-red-600 w-1/3"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="rounded-md font-bold text-sm bg-gray-50 px-3 py-2 text-gray-100 bg-blue-500 w-1/3"
              onClick={() => {
                onReported(selectedSquare.detail.words);
                setModalOpen(false);
                console.log("Submitting");
              }}
            >
              Submit
            </button>
          </div>
        </Modal>
        {!enable && (
          <div className="bg-gray-800 flex-col w-full min-h-full flex items-center justify-center relative">
            <div className="flex items-center justify-center">
              <MapMarker
                className="animate-bounce mb-4 fill-slate-100 absolute z-10"
                size={10}
              />
            </div>
            <p className="mt-6 text-slate-100 text-sm font-medium text-center">
              Map service is currently unavailable... retrying connection
            </p>
            <button
              className="mt-5 px-3 py-2 font-bold text-sm text-slate-800 bg-slate-200 rounded-full"
              onClick={async () => {
                await report();
              }}
            >
              [ Test Report Button ]
            </button>
            <div
              className="absolute w-full h-full opacity-[.15] z-1 pointer-events-none"
              style={{
                background: "url(/map.png) fixed center center",
              }}
            />
          </div>
        )}
        {enable && (
          <W3WMap
            canReport={wallet}
            onClickReportCurrentMarkerButton={() => {
              setModalOpen(true);
              console.log({ selectedSquare });
            }}
            onSelectedSquare={(e) => {
              setSelectedSquare(e);
            }}
            onMapLoaded={() => {
              console.log("onMapLoaded() fired");
              setLoading(false);
            }}
          />
        )}
      </div>
    </>
  );
}
