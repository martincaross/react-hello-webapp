export const initialStore = () => {
  return {
    agendas: [], // Lista vacía de agendas al principio
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_agenda":
      return {
        ...store,
        agendas: [...store.agendas, action.payload],
      };
    case "delete_agenda":
      return {
        ...store,
        agendas: store.agendas.filter((agenda) => agenda.id !== action.payload),
      };
    case "add_contact_to_agenda":
      return {
        ...store,
        agendas: store.agendas.map((agenda) =>
          agenda.id === action.payload.agendaId
            ? { ...agenda, contacts: [...agenda.contacts, action.payload.contact] }
            : agenda
        ),
      };
    default:
      throw Error("Unknown action.");
  }
}
