import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Tear from "../img/tear.svg";

const Home = ({ title }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "?title=" + title;
        }
        // if (priceMax) {
        //   if ( filters) {
        //     filters += "&priceMax="
        //   } else {
        //     filters += "?priceMax="
        //   }
        // }

        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers" + filters
        );
        // console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [title]);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <main>
      <section className="hero">
        <div className="bg-hero">
          <img src={Tear} alt="picture border" />
          <div className="container">
            <div className="cta">
              <p>Prêts à faire du tri dans vos placards ?</p>
              <Link to="/publish">
                <button>Commencer à vendre</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <h2>Fil d'actu</h2>
      </div>
      <div className="card-container">
        {data.offers.map((offer) => {
          return (
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <article className="card-content">
                <div className="card-user">
                  {offer.owner.account.avatar && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="user avatar"
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <img
                  src={offer.product_image.secure_url}
                  alt="product picture"
                />
                <div className="product-info">
                  <p>{offer.product_price.toFixed(2)} €</p>
                  {offer.product_details.map((detail, index) => (
                    <div key={index}>
                      {detail.MARQUE && <p>{detail.MARQUE}</p>}
                      {detail.TAILLE && <p>{detail.TAILLE}</p>}
                    </div>
                  ))}
                </div>
              </article>
            </Link>
          );
        })}
      </div>
      <Link to="/offer/:id">Offres</Link>
    </main>
  );
};
export default Home;
