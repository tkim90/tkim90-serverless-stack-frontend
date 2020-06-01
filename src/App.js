import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';

import { AppContext } from './libs/contextLib';
import { Routes } from './Routes'
import { onError } from './libs/errorLibs';
import './App.css';


const App = () => {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  
  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  React.useEffect(() => {
    onLoad();
  }, []);

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('/login');
  }

  return (
    isAuthenticating
    ? <h1>Loading...</h1> 
    : 
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? <NavItem onClick={handleLogout}>Logout</NavItem>
              : <React.Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </React.Fragment>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AppContext.Provider value ={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
