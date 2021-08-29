const ESTADO_INICIAL = {
    idEndereco: 0,
  };
  
  export default function Endereco(state = ESTADO_INICIAL, action) {
    switch (action.type) {
        case "SET_ID_ENDERECO":
          return {
            ...state,
            idEndereco: action.idEndereco,
          };
          default:
          return {
              ...state
        }
    }
}