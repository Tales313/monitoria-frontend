import estilos from './Menu.module.scss';
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from "../../Contexts/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {

    const { signOut } = useAuth()
    const navigate = useNavigate()

    const deslogar = () => {
        signOut()
        navigate('/')
    }

  return (
      <nav className={estilos.Nav}>
          <ul>
              <li>
                  <Link to="/">Login</Link>
              </li>
              <li>
                  <Link to="/vagas">Vagas</Link>
              </li>
          </ul>
          <div>
              <LogoutIcon onClick={deslogar}/>
          </div>
      </nav>
  )
}

export default NavBar