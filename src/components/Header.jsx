import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loginName: '',
    isLoading: false,
  };

  componentDidMount() {
    this.renderizaUser();
  }

  renderizaUser = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        isLoading: false,
        loginName: user.name,
      });
    });
  };

  render() {
    const {
      loginName,
      isLoading,
    } = this.state;

    return (
      <header data-testid="header-component">
        <nav className="flex items-center justify-around p-6 lg:px-8" aria-label="Global">
          <Link
            data-testid="link-to-search"
            className="text-sm font-semibold leading-6 text-gray-900"
            to="/search"
          >
            Search
          </Link>
          <Link
            data-testid="link-to-favorites"
            className="text-sm font-semibold leading-6 text-gray-900"
            to="/favorites"
          >
            Favorites
          </Link>

          <Link
            data-testid="link-to-profile"
            className="text-sm font-semibold leading-6 text-gray-900"
            to="/profile"
          >
            Profile
          </Link>
        </nav>
        <div className="flex items-center justify-around text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {(isLoading) ? <h2><Loading /></h2>
            : (
              <h2 data-testid="header-user-name">
                {loginName}
              </h2>)}
        </div>

      </header>
    );
  }
}
export default Header;
