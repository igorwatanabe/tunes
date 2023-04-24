import React from 'react';
import PropTypes from 'prop-types';

import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    loginName: '',
    buttonDisabled: true,
    isLoading: false,
  };

  validation = () => {
    const {
      loginName,
    } = this.state;

    const numberThree = 3;
    const minLengthName = loginName.length >= numberThree;

    this.setState({
      buttonDisabled: !(
        minLengthName
      ),
    });
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validation);
  };

  onClickEntrar = async (nomeDigitado) => {
    const { history } = this.props;
    this.setState({
      isLoading: true, // altera no state, para aparecer o Carregando...
    }, async () => {
      await createUser(nomeDigitado);
      this.setState({
        isLoading: false,
      }, () => history.push('/search')); // history.push REDIRECIONA
    });
  };

  render() {
    const {
      buttonDisabled,
      loginName,
      isLoading,
    } = this.state;

    return (
      <div data-testid="page-login">
        {(isLoading) ? <h2><Loading /></h2>
          : (
            <form>
              <input
                type="text"
                name="loginName"
                value={ loginName }
                data-testid="login-name-input"
                placeholder="Nome"
                onChange={ this.onInputChange }
              />
              <button
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ () => this.onClickEntrar({ name: loginName }) }
              >
                Entrar
              </button>
            </form>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
