import logo from './logo.svg';
import './App.css';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Dashboard from './Pages/Dashboard';
import Header from './Component/Header';
import Home from './Pages/Home';
function App() {
  return (
    <div className="App bg-light">
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Header/>
            <Home/>
          </Route>
          <Route path="/dashboard">
            <Header/>
            <Dashboard/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/">
            <Login/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
