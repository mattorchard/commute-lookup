import { debounce } from "./helpers/timingHelpers";
import { getSettings, saveSettings } from "./helpers/settingsHelpers";

const elements = {
  form: document.querySelector("form"),
  destinationInput: document.querySelector("input[name=destination]"),
};

const saveNewSettings = () =>
  saveSettings({
    destination: elements.destinationInput.value,
  });

const saveNewSettingsDebounced = debounce(saveNewSettings);

// Prevent page reloading on submission
elements.form.addEventListener("submit", event => event.preventDefault());

elements.form.addEventListener("input", saveNewSettingsDebounced);

// Set the initial value, unless the user has already made changes
getSettings().then(({ destination }) => {
  elements.destinationInput.value =
    elements.destinationInput.value || destination || "";
});
