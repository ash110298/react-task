import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Image} from 'semantic-ui-react';
import RegistrationForm from './components/registration';
import LoginForm from './components/login';
import Estudents from './pages/enrollstudent'
import Main1 from './pages/main';
function App() {
  return (
    <div className="App">
    <Router>
        <Route exact path = "/"  component = {Main1} />
        <Route path = "/login"  component = {LoginForm} />
        <Route path = "/register" component = {RegistrationForm} />
        <Route path = "/estudents12" component = {Estudents} />
        <Route path = "/estudents1/edit/:id" component = {Estudents} />
    </Router>
    </div>
  );
}

export default App;
