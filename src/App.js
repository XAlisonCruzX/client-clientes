
import './App.css';
import Cadastro from './Views/Cadastro/Cadastro';
import TelaInicial from './Views/TelaInical/TeleInicial';
import { Provider } from "react-redux";
import store from "./Store/store";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="App">
        <div id="esp-cab"></div>
        <div id="esp-esq">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Cadastro">Cadastro</Link>
              </li>
            </ul>
          </nav>


        </div>
        <div id="esp-cen">
          <Provider store={store}>
            <Switch>
              <Route path="/Cadastro">
                <Cadastro />
              </Route>
              <Route path="/">
                <TelaInicial />
              </Route>
            </Switch>
          </Provider>
        </div>
        <div id="esp-dir"></div>
        <div id="esp-rod"></div>
      </div>



    </Router>
  )
}

export default App;
