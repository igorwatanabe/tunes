import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    isLoading: false,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: '',
  };

  componentDidMount() {
    this.renderUser();
  }

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

  render() {
    const {
      isLoading,
      userName,
      userEmail,
      userDescription,
      userImg,
    } = this.state;
    return (
      <div data-testid="page-profile" className="flex flex-col justify-center items-center">
        { isLoading ? <Loading />
          : (
            <div>
              <p>{userName}</p>
              <p>{userEmail}</p>
              <p>{userDescription}</p>
              <img data-testid="profile-image" src={ userImg } alt="imagem do usuário" />
            </div>
          )}

        <Link to="/profile/edit">
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Editar perfil
          </button>
        </Link>
      </div>
    );
  }
}
export default Profile;
