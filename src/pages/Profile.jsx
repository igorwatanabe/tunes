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
    console.log(user);
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
      <div data-testid="page-profile">
        { isLoading ? <Loading />
          : (
            <>
              <p>{userName}</p>
              <p>{userEmail}</p>
              <p>{userDescription}</p>
              <img data-testid="profile-image" src={ userImg } alt="imagem do usuário" />
              <Link to="/profile/edit">
                <button>Editar perfil</button>
              </Link>
            </>
          )}
      </div>
    );
  }
}
export default Profile;
