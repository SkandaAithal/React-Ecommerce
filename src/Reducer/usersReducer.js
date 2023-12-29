export default function UsersReducer(state, action) {
  switch (action.type) {
    case "OPEN_LOGIN":
      return {
        ...state,
        openLogin: true,
      };

    case "CLOSE_LOGIN":
      return {
        ...state,
        openLogin: false,
      };

    case "CLOSE_NOTIFICATION":
      return {
        ...state,
        isNotify: false,
      };

    case "SHOW_NOTIFICATION":
      let color;
      if (action.payload.color === "green") {
        color = "#4caf50";
      } else if (action.payload.color === "red") {
        color = "#db0808";
      } else {
        color = "#000000";
      }

      return {
        ...state,
        isNotify: true,
        notifyMessage: action.payload.message,
        notifyColor: color,
      };
  }
  return state;
}
