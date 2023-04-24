import React from 'react';
import PropTypes from 'prop-types';

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
    }, () => history.push('/profile'));
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
            <form action="">
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="userName"
                  value={ userName }
                  onChange={ this.onInputChange }
                  id="name"
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  data-testid="edit-input-email"
                  type="email"
                  name="userEmail"
                  value={ userEmail }
                  onChange={ this.onInputChange }
                  id="email"
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <textarea
                  data-testid="edit-input-description"
                  name="userDescription"
                  id="description"
                  cols="30"
                  rows="10"
                  value={ userDescription }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="image">
                Foto
                <input
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
