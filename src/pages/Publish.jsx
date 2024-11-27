import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  //state pour chaque input du formdata
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  // state pour prévisualiser l'image sélectionnée
  const [preview, setPreview] = useState(null);

  return token ? (
    <main className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const formData = new FormData();
              formData.append("title", title);
              formData.append("description", description);
              formData.append("price", price);
              formData.append("condition", condition);
              formData.append("city", city);
              formData.append("brand", brand);
              formData.append("size", size);
              formData.append("color", color);
              formData.append("picture", file);

              const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/offer/publish`,
                formData,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              alert(JSON.stringify(response.data));
            } catch (err) {
              if (err.response.status === 500) {
                console.error("An error occurred");
              } else {
                console.error(err.response.data.msg);
              }
            }
          }}
        >
          <div className="file-upload">
            {/* Affiche l'image de prévisualisation uniquement si preview existe */}
            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="Prévisualisation" />
              </div>
            ) : (
              <div className="dashed-preview-image">
                <div className="upload-box">
                  <label htmlFor="picture" className="label-picture">
                    <span className="upload-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                </div>
              </div>
            )}
            <input
              className="input-file"
              type="file"
              id="picture"
              onChange={(event) => {
                setFile(event.target.files[0]);
                setPreview(URL.createObjectURL(event.target.files[0]));
              }}
            />
          </div>
          <div className="input-section">
            <div className="text-input">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <label htmlFor="description">Décris ton article</label>
              <textarea
                type="text"
                id="description"
                placeholder="ex: porté quelquefois, taille correctement"
                rows={5}
                cols={50}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section">
            <div className="text-input">
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section">
            <div className="text-input">
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                id="size"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section">
            <div className="text-input">
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                id="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section">
            <div className="text-input">
              <label htmlFor="condition">État</label>
              <input
                type="text"
                id="condition"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section">
            <div className="text-input">
              <label htmlFor="city">Lieu</label>
              <input
                type="text"
                id="city"
                placeholder="ex: Toulouse"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="input-section">
            <div className="text-input">
              <label htmlFor="price">Prix</label>
              <div className="checkbox-section">
                <input
                  type="text"
                  id="price"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox-input">
                  <label htmlFor="exchange" className="checkbox-design"></label>
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value="exchange"
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-button">
            <button className="validation">Ajouter</button>
          </div>
        </form>
      </div>
    </main>
  ) : (
    // permet de rediriger l'utilisateur, en utilisant la props state de Navigate pour transférer l'info que l'on vient de cette page
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
