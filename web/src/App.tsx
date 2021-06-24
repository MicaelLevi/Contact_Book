import React from 'react';
import { RouteComponentProps, Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateContact from './components/Contact/CreateContact';
import EditContact from './components/Contact/EditContact';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/adicionar'} exact component={CreateContact} />
        <Route path={'/editar/:id'} exact component={EditContact} />
      </Switch>
    </div>


  );
}

export default App;
