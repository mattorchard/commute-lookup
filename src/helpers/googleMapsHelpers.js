import { getAdjustedEpochSeconds } from "./dateHelpers";

export const createMapsUrl = (
  origin,
  destination,
  { travelMode = "transit" } = {}
) => {
  const baseUrl = "https://www.google.com/maps/dir/";
  const params = new URLSearchParams();
  params.append("api", "1");
  params.append("origin", origin);
  params.append("destination", destination);
  params.append("travelmode", travelMode);
  return `${baseUrl}?${params}`;
};

const encode = text => encodeURI(text.replace(/ /g, "+"));

const travelModeCodes = {
  driving: "0",
  bicycling: "1",
  walking: "2",
  transit: "3",
  flight: "4",
};

export const createMapsUrlExperimental = (
  origin,
  destination,
  { travelMode = "transit", arriveBy = new Date() } = {}
) => {
  const baseUrl = "https://www.google.com/maps/dir/";
  const arriveByFormatted = getAdjustedEpochSeconds(arriveBy);
  const travelModeCode = travelModeCodes[travelMode];
  const data = `!4m6!4m5!2m3!6e1!7e2!8j${arriveByFormatted}!3e${travelModeCode}`;
  return `${baseUrl}${encode(origin)}/${encode(destination)}/data=${data}`;
};
