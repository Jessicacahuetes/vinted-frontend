import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import LogoVinted from "../img/logo-vinted.png";
const Header = ({ token, handleConnexionStatus }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={LogoVinted} alt="logo vinted" />
        </Link>
        <div className="search-bar">
          <IoSearch className="search-icon" />
          <input type="text" placeholder="Rechercher des articles" />
        </div>
        {token ? (
          <button
            className="logout"
            onClick={() => {
              handleConnexionStatus(null);
              // Cookies.remove("userToken");
              // setToken(null);
              navigate("/");
            }}
          >
            Déconnexion
          </button>
        ) : (
          <div className="signup-login">
            <Link to="/signup">
              <button className="signup">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="login">Se connecter</button>
            </Link>
          </div>
        )}
        <div>
          <Link to="/publish">
            <button className="sell"> Vends tes articles</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
