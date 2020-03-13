import { createMapsUrl } from "./helpers/googleMapsHelpers";

const handleContextMenuClick = ({ selectionText: origin }) => {
  // Todo: Get destination from settings
  const url = createMapsUrl(origin, "Null");
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
