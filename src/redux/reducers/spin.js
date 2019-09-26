export function showSpinAction(payload) {
  return {
    type: "Show-SPIN",
    payload
  };
}

const initState = {
  show: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case "Show-SPIN":
      return {
        ...state,
        show: action.payload
      };
    default:
      return state;
  }
};
