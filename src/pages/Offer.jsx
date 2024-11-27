// import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v2/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <main className="offer-container">
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className="offer">
          <div className="col1">
            <img src={data.product_image.secure_url} alt="product picture" />
          </div>
          <div className="col2">
            <div className="content-info">
              <div className="content-top">
                <p>{data.product_price.toFixed(2)} €</p>
                {data.product_details.map((detail, index) => {
                  const keysInObj = Object.keys(detail);
                  const keyInObj = keysInObj[0];
                  return (
                    <div className="offer-list" key={index}>
                      <span>{keyInObj}</span>
                      <span>{detail[keyInObj]}</span>
                    </div>
                  );
                })}
              </div>
              <div className="divider"></div>
              <div className="content-bottom">
                <p>{data.product_name}</p>
                <p>{data.product_description}</p>
                <div className="user-info">
                  <img
                    src={data.owner.account.avatar.secure_url}
                    alt="user's avatar"
                  />
                  <p>{data.owner.account.username}</p>
                </div>
                <button>Acheter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default Offer;
