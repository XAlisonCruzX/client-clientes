import { combineReducers } from "redux";

import Cliente from "./Cliente";
import Contato from "./Contato"
import Endereco from "./Endereco";
import RedeSocial from "./RedeSocial"

export default combineReducers({
    Cliente,
    Contato,
    Endereco,
    RedeSocial
});