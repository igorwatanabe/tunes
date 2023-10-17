import PropTypes from 'prop-types';
import React from 'react';

import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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
      <div
        data-testid="page-login"
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        {(isLoading) ? <h2><Loading /></h2>
          : (
            <form>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20
                text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
                sm:leading-6"
                type="text"
                name="loginName"
                value={ loginName }
                data-testid="login-name-input"
                placeholder=" Nome"
                onChange={ this.onInputChange }
              />
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
