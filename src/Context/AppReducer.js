export default (state, action) => {
    const { type,payload} = action
    switch (type) {
      case "GET_CUSTOMER":
        return {
          ...state,
          loading: false,
          customers: payload
        };

        case "CUSTOMER_ERROR":
            return {
              ...state,
              loading: false,
              error: payload
            };
      default:
        return state;
    }
  };