const ESTADO_INICIAL = {
    idCliente: 0,
  };
  
  export default function Cliente(state = ESTADO_INICIAL, action) {
    switch (action.type) {
        case "SET_ID_CLIENTE":
          return {
            ...state,
            idCliente: action.idCliente,
          };
          default:
          return {
              ...state
        }
    }
}