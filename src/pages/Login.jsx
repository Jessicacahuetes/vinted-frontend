import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleConnexionStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      handleConnexionStatus(response.data.token);
      navigate("/");
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer !");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Se connecter</h2>
      <form className="signup-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {errorMessage && (
          <p
            style={{
              color: "#c2175c",
              fontSize: "12px",
              fontFamily: "Maison Neue Book",
            }}
          >
            {errorMessage}
          </p>
        )}
        <button>Se connecter</button>
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
};

export default Login;
