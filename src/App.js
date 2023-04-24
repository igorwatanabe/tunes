import React from 'react';

import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <main>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search">
            <Header />
            <Search />
          </Route>
          <Route
            exact
            path="/album/:id"
            render={ (props) => (
              <>
                <Header />
                <Album { ...props } />
              </>
            ) }
          />
          <Route
            exact
            path="/favorites"
            render={ (props) => (
              <>
                <Header />
                <Favorites { ...props } />
              </>
            ) }
          />
          <Route exact path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route
            exact
            path="/profile/edit"
            render={ (props) => (
              <>
                <Header />
                <ProfileEdit { ...props } />
              </>
            ) }
          />
          <Route exact component={ NotFound } />
        </Switch>
      </main>

    );
  }
}

export default App;
