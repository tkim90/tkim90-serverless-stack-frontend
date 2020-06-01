import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './containers/Home';
import { Login } from './containers/Login';
import { NotFound } from './containers/NotFound';
import { NewNote } from './containers/NewNote';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/notes/new">
        <NewNote />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  )
}