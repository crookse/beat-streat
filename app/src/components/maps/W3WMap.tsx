import {
  What3wordsAutosuggest,
  What3wordsMap,
} from "@what3words/react-components";
import { env } from "../../utils/env";

// TODO(crookse) Should implement server-side to prevent exposing API key
const config = {
  what3words_api_key: env("APP_WHAT3WORDS_API_KEY", ""),
  google_maps_api_key: env("APP_GOOGLE_MAPS_API_KEY", ""),
};

export default function W3WMap({
  canReport = false,
  onSelectedSquare = console.log,
  onMapLoaded = console.log,
  onClickReportCurrentMarkerButton = console.log,
}) {
  return (
    <What3wordsMap
      id="w3w-map"
      api_key={config.what3words_api_key}
      map_api_key={config.google_maps_api_key}
      current_location_control_position={9}
      current_location={true}
      disable_default_ui={true}
      fullscreen_control_position={3}
      fullscreen_control={true}
      map_type_control={false}
      // words="orbited.helps.tackles"
      zoom_control={true}
      zoom_control_position={7}
      on__load={(e) => {
        console.log("Map loaded");
        onMapLoaded(e);
      }}
      className="flex flex-1 h-auto"
      onSelected_square={(e) => {
        onSelectedSquare(e);
      }}
    >
      <div slot="map" style={{ width: "100vw", height: "100%" }} />
      <div
        className="fixed"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 275,
          margin: "10px 0 0 10px",
        }}
      >
        <div slot="search-control">
          <What3wordsAutosuggest
            className="fixed m-2 shadow-md border-2 border-gray-800"
            style={{ width: 275 }}
          >
            <input
              type="text"
              placeholder="Find your address"
              style={{
                width: "100%",
                outline: "none !important",
                border: "none !important",
              }}
              autoComplete="off"
            />
          </What3wordsAutosuggest>
          {canReport && (
            <button
              className="shadow shadow-gray-500 fixed py-4 px-4 font-bold text-slate-200 text-center z-20"
              style={{
                right: "1rem",
                bottom: "185px",
                maxWidth: 175,
                minWidth: 175,
                width: "100%",
                backgroundColor: "#083049",
              }}
              onClick={() => {
                onClickReportCurrentMarkerButton();
              }}
            >
              <span className="text-xs">
                Report Current Marker
              </span>
            </button>
          )}
        </div>
      </div>
      <div
        slot="current-location-control"
        style={{
          fontWeight: "bold",
          fontSize: 14,
          bottom: 0,
          margin: "0 .5rem 0 0",
        }}
      >
        <div className="flex flex-col gap-4 mr-2 mb-24 md:mb-0">
          <button
            className="shadow shadow-gray-500 py-4 px-4 text-slate-200 text-center"
            style={{
              maxWidth: 175,
              minWidth: 175,
              width: "100%",
              backgroundColor: "#083049",
            }}
          >
            <span className="text-xs">Show your location</span>
          </button>
        </div>
      </div>
    </What3wordsMap>
  );
}
