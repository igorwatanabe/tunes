import React from 'react';

import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

import Header from './components/Header';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <main>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={ {
              clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            } }
          />
        </div>
        <p
          className="mt-10
        text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          🔊 Tunes 🎶
        </p>
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
