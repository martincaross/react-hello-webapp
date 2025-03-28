export const initialStore = () => {
  return {
    selectedAgenda: "mi_agenda",
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_SELECTED_AGENDA":
      return {
        ...store,
        selectedAgenda: action.payload, 
      };
    default:
      throw Error("Unknown action.");
  }
}
