const ESTADO_INICIAL = {
    idRedeSocial: 0,
  };
  
  export default function RedeSocial(state = ESTADO_INICIAL, action) {
    switch (action.type) {
        case "SET_ID_REDESOCIAL":
          return {
            ...state,
            idRedeSocial: action.idRedeSocial,
          };
          default:
          return {
              ...state
        }
    }
}