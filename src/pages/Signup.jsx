console.log(import.meta.env.VITE_API_URL); // Affiche l'URL de l'API
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form
        className="signup-form"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/user/signup`,
              { username, email, password, newsletter }
            );
            Cookies.set("userToken", response.data.token);
            navigate("/");
          } catch (error) {
            // Si je reçois le status 409
            if (error.response.status === 409) {
              // je fais appraître un message d'erreur
              setErrorMessage("Cette adresse email est déjà utilisée :)");
            } else if (error.response.data.message === "Missing parameters") {
              // Si je reçois le message Missing parameters idem
              setErrorMessage("Veuillez remplir tous les champs");
            } else {
              // Si je tombe dans le catch pour une raison inconnue
              setErrorMessage("Une erreur est survenue, veuillez réessayer !");
            }
          }
        }}
      >
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          name="usermane"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="checkbox-container">
          <div>
            <input
              type="checkbox"
              id="subscribeNews"
              name="subscribe"
              checked={newsletter}
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <button>S'inscrire</button>
        {errorMessage && <p style={{ color: "#c2175c" }}>{errorMessage}</p>}
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </div>
  );
};

export default Signup;
