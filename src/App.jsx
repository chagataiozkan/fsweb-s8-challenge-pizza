import "./App.css";
import { Switch, Route } from "react-router-dom";

import MainPage from "./components/MainPage.jsx";
import OrderForm from "./components/OrderForm.jsx";
import Success from "./components/Success.jsx";
import { useState } from "react";

function App() {

  const [order, setOrder] = useState(null);

  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>

      <Route path="/order">
        <OrderForm setOrder={setOrder}/>
      </Route>

      <Route path="/success">
        <Success order={order}/>
      </Route>
    </Switch>
  );
}

export default App;
