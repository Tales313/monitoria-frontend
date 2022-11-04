import estilos from './Menu.module.scss';
import { Link } from 'react-router-dom'

const NavBar = () => {
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
      </nav>
  )
}

export default NavBar