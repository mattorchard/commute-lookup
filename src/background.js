import { createMapsUrlExperimental } from "./helpers/googleMapsHelpers";
import { subscribeToSettings } from "./helpers/settingsHelpers";
import { getNextCommutingTime } from "./helpers/dateHelpers";
import { ignoreInAddressPattern } from "./helpers/regexHelpers";
import { getLocationFromLink } from "./helpers/locationLinkHelpers";

const settings = {};
// noinspection JSIgnoredPromiseFromCall, no need to wait for initial value
subscribeToSettings(newSettings => Object.assign(settings, newSettings));

const cleanTextForOrigin = rawText =>
  rawText
    .replace(ignoreInAddressPattern, "")
    .trimStart()
    .trimEnd();

const openMapsForOrigin = originRaw => {
  const origin = cleanTextForOrigin(originRaw);
  const url = createMapsUrlExperimental(origin, settings.destination || "", {
    arriveBy: getNextCommutingTime(),
  });
  console.log("Created url", url);
  window.open(url, "_blank");
};

const handleSelectionContextMenuClick = ({ selectionText }) =>
  openMapsForOrigin(selectionText);

const handleLinkContextMenuClick = ({ linkUrl }) => {
  const origin = getLocationFromLink(linkUrl);
  console.log("Processed link, extracted address", origin, linkUrl);
  openMapsForOrigin(origin);
};

const selectionContextMenuOptions = {
  id: "ADDRESS_SELECTION_CONTEXT_MENU_V1",
  title: `Check commute time for "%s"`,
  contexts: ["selection"],
  onclick: handleSelectionContextMenuClick,
};

const linkContextMenuOptions = {
  id: "ADDRESS_LINK_CONTEXT_MENU_V1",
  title: `Check commute time for this link`,
  contexts: ["link"],
  onclick: handleLinkContextMenuClick,
};

chrome.contextMenus.create(selectionContextMenuOptions, () =>
  console.log("Created selection context menu")
);

chrome.contextMenus.create(linkContextMenuOptions, () =>
  console.log("Created link context menu item")
);
