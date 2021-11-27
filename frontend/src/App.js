import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/home";
import Transacao from ".pages/Transacao";
import Historico from ".pages/historico";

const App = () => {

  return (
    
    <BrowserRouter>
      <Route exact path="/historico" component={Historico} />
      <Route exact path="/transacao" component={Transacao} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Register} />

    </BrowserRouter>
  )
}

export default App;
