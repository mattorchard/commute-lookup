const customLocationExtractors = {
  "rentals.ca": url => {
    const [, city, description] = url.pathname.split("/");
    return `${description.replace(/-/g, " ")} ${city}`;
  },
};

const getLocationFromLinkGeneric = url => url.pathname.replace(/[/+-]/g, " ");

export const getLocationFromLink = linkText => {
  const url = new URL(linkText);

  // Has first class support for this url
  if (url.host in customLocationExtractors) {
    return customLocationExtractors[url.host](url);
  }
  console.warn(`No custom routine for host [${url.host}]`);
  return getLocationFromLinkGeneric(url);
};
