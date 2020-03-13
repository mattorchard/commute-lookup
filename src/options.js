import { debounce } from "./helpers/timingHelpers";
import { getSettings, saveSettings } from "./helpers/settingsHelpers";

const saveDestination = destination => saveSettings({ destination });
const saveDestinationDebounced = debounce(saveDestination);

const elements = {
  form: document.querySelector("form"),
  destinationInput: document.querySelector("input[name=destination]"),
};

// Prevent page reloading on submission
elements.form.addEventListener("submit", event => event.preventDefault());

elements.destinationInput.addEventListener("input", event =>
  saveDestinationDebounced(event.currentTarget.value)
);

// Set the initial value, unless the user has already made changes
getSettings().then(({ destination }) => {
  if (destination && !elements.destinationInput.value) {
    elements.destinationInput.value = destination;
  }
});
