import PropTypes from 'prop-types';
import React from 'react';

import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: '',
    isSaveButtonDisabled: true,
  };

  componentDidMount() {
    this.renderUser();
  }

  validation = () => {
    const {
      userName,
      userImg,
      userDescription,
      userEmail,
    } = this.state;

    const valName = userName.length > 0;
    const valImage = userImg.length > 0;
    const valDescription = userDescription.length > 0;

    const positiveOne = 1;
    const negativeOne = -1;
    const numThree = 3;

    const usuario = userEmail.substring(0, userEmail.indexOf('@'));
    const dominio = userEmail.substring(userEmail.indexOf('@') + 1, userEmail.length);
    const valEmail = (
      (usuario.length >= 1)
      && (dominio.length >= numThree)
      && (usuario.search('@') === negativeOne)
      && (dominio.search('@') === negativeOne)
      && (usuario.search(' ') === negativeOne)
      && (dominio.search(' ') === negativeOne)
      && (dominio.search('.') !== negativeOne)
      && (dominio.indexOf('.') >= positiveOne)
      && (dominio.lastIndexOf('.') < dominio.length - 1)
    );

    this.setState({
      isSaveButtonDisabled: !(
        valName
        && valImage
        && valDescription
        && valEmail
      ),
    });
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name } = target;

    this.setState({
      [name]: target.value,
    }, this.validation);
  };

  renderUser = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      isLoading: false,
      userName: user.name,
      userEmail: user.email,
      userDescription: user.description,
      userImg: user.image,
    });
  };

  updateUserInfo = async () => {
    const { history } = this.props;
    const {
      userName,
      userEmail,
      userImg,
      userDescription,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    await updateUser({
      name: userName,
      email: userEmail,
      image: userImg,
      description: userDescription,
    });
    this.setState({
      isLoading: false,
    });
    history.push('/profile');
  };

  render() {
    const {
      isLoading,
      userName,
      userEmail,
      userDescription,
      userImg,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        {isLoading ? <Loading />
          : (
            <form action="" className="mx-auto mt-16 max-w-xl sm:mt-20">
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Nome
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  data-testid="edit-input-name"
                  type="text"
                  name="userName"
                  value={ userName }
                  onChange={ this.onInputChange }
                  id="name"
                />
              </label>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  data-testid="edit-input-email"
                  type="email"
                  name="userEmail"
                  value={ userEmail }
                  onChange={ this.onInputChange }
                  id="email"
                />
              </label>
              <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                Descrição
                <textarea
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  data-testid="edit-input-description"
                  name="userDescription"
                  id="description"
                  cols="30"
                  rows="10"
                  value={ userDescription }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900">
                Foto
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="image"
                  name="userImg"
                  data-testid="edit-input-image"
                  value={ userImg }
                  onChange={ this.onInputChange }
                  type="text"
                />
              </label>
              <button
                data-testid="edit-button-save"
                disabled={ isSaveButtonDisabled }
                onClick={ () => this.updateUserInfo() }
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
