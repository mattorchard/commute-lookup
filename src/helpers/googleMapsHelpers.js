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
  params.append("arriveby", new Date().toISOString());
  return `${baseUrl}?${params}`;
};
