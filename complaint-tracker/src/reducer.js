export const STATUSES = ["Pending", "In Progress", "Resolved"];
export const CATEGORIES = ["Road", "Water", "Electricity", "Waste", "Other"];

export function complaintsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        {
          id: crypto.randomUUID(),
          status: "Pending",
          createdAt: new Date().toISOString(),
          ...action.payload,
        },
        ...state,
      ];
    case "UPDATE_STATUS":
      return state.map((c) =>
        c.id === action.id ? { ...c, status: action.status } : c
      );
    case "EDIT":
      return state.map((c) =>
        c.id === action.id ? { ...c, ...action.changes } : c
      );
    case "DELETE":
      return state.filter((c) => c.id !== action.id);
    default:
      return state;
  }
}
