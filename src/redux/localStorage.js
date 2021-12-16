export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('teebay-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    console.error("REDUX WRITE ERROR OCCURRED!")
  }
};
