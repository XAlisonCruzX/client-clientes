const ESTADO_INICIAL = {
    idContato: 0,
  };
  
  export default function Contato(state = ESTADO_INICIAL, action) {
    switch (action.type) {
        case "SET_ID_CONTATO":
          return {
            ...state,
            idContato: action.idContato,
          };
          default:
          return {
              ...state
        }
    }
}