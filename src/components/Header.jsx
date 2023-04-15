import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Header extends React.Component {
  state = {
    loginName: '',
    isLoading: false,
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.renderizaUser();
  }

  renderizaUser = async () => {
    console.log(getUser());
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
        <Link
          data-testid="link-to-search"
          className="link"
          to="/search"
        >
          Search
        </Link>
        <Link
          data-testid="link-to-favorites"
          className="link"
          to="/favorites"
        >
          Favorites
        </Link>
        <Link
          data-testid="link-to-profile"
          className="link"
          to="/profile"
        >
          Profile
        </Link>
        {(isLoading) ? <h2><Loading /></h2>
          : (
            <h2 data-testid="header-user-name">
              {loginName}
            </h2>)}
      </header>
    );
  }
}
export default Header;
