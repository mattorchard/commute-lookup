export const getSettings = async () =>
  new Promise(resolve => chrome.storage.sync.get(null, resolve));

export const saveSettings = async settings =>
  new Promise(resolve => chrome.storage.sync.set(settings, resolve));

export const subscribeToSettings = async (callback, initialTrigger = true) => {
  // Track if any changes have gone through yet
  let changeHasOccurred = false;

  chrome.storage.onChanged.addListener(changes => {
    const settings = Object.fromEntries(
      Object.entries(changes).map(([key, change]) => [key, change.newValue])
    );
    changeHasOccurred = true;
    callback.apply(this, [settings]);
  });

  if (!initialTrigger) {
    return;
  }
  const settings = await getSettings();
  // Don't bother if a change has already occurred
  if (!changeHasOccurred) {
    callback.apply(this, [settings]);
  }
};
