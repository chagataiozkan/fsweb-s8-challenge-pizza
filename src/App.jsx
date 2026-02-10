import "./App.css";
import { Switch, Route } from "react-router-dom";

import MainPage from "./components/MainPage.jsx";
import OrderForm from "./components/OrderForm.jsx";
import Success from "./components/Success.jsx";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>

      <Route path="/order">
        <OrderForm />
      </Route>

      <Route path="/success">
        <Success />
      </Route>
    </Switch>
  );
}

export default App;
