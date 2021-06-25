import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateContact from './components/Contact/CreateContact';
import EditContact from './components/Contact/EditContact';
import DetailsContact from './components/Contact/DetailsContact';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/adicionar'} exact component={CreateContact} />
        <Route path={'/editar/:id'} exact component={EditContact} />
        <Route path={'/detalhes/:id'} exact component={DetailsContact} />
      </Switch>
    </div>


  );
}

export default App;
