import { createMapsUrlExperimental } from "./helpers/googleMapsHelpers";
import { subscribeToSettings } from "./helpers/settingsHelpers";
import { getNextCommutingTime } from "./helpers/dateHelpers";

const settings = {};

// noinspection JSIgnoredPromiseFromCall, no need to wait for initial value
subscribeToSettings(newSettings => Object.assign(settings, newSettings));

const handleContextMenuClick = ({ selectionText: origin }) => {
  const url = createMapsUrlExperimental(origin, settings.destination || "", {
    arriveBy: getNextCommutingTime(),
  });
  console.log("Created url", url);
  window.open(url, "_blank");
};

const contextMenuOptions = {
  id: "ADDRESS_SELECTION_CONTEXT_MENU_V1",
  title: `Check commute time for "%s"`,
  contexts: ["selection"],
  onclick: handleContextMenuClick,
};
chrome.contextMenus.create(contextMenuOptions, () =>
  console.log("Created context menu")
);
