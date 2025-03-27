export const initialStore = () => {
  return {
    selectedAgenda: "mi_agenda",  // Mantener la agenda seleccionada
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_SELECTED_AGENDA":
      return {
        ...store,
        selectedAgenda: action.payload,  // Guardar la agenda seleccionada
      };
    default:
      throw Error("Unknown action.");
  }
}
