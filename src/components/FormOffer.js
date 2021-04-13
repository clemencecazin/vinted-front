import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const FormOffer = ({ userToken }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [preview, setPreview] = useState();
    const [messageModify, setMessageModify] = useState("");
    const location = useLocation();

    const history = useHistory();

    useEffect(() => {
        if (location.state) {
            setTitle(location.state.product_name);
            setDescription(location.state.product_description);
            setPrice(location.state.product_price);
            setBrand(location.state.product_details[0].MARQUE);
            setSize(location.state.product_details[1].TAILLE);
            setCondition(location.state.product_details[2].ETAT);
            setCity(location.state.product_details[4].EMPLACEMENT);
            setColor(location.state.product_details[3].COULEUR);
            setFile(location.state.product_image.secure_url);
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            setMessageModify("");

            if (
                !title ||
                !file ||
                !description ||
                !brand ||
                !size ||
                !color ||
                !condition ||
                !city ||
                !price
            ) {
                setMessageModify("Veuillez remplir tous les champs");
            } else {
                const formData = new FormData(); // New Object
                formData.append("picture", file); // Name Back et value
                formData.append("title", title);
                formData.append("description", description);
                formData.append("brand", brand);
                formData.append("size", size);
                formData.append("color", color);
                formData.append("condition", condition);
                formData.append("location", city);
                formData.append("price", price);

                if (!location.state) {
                    const response = await axios.post(
                        "https://project-vinted.herokuapp.com/offer/publish",
                        formData,
                        {
                            headers: {
                                authorization: `Bearer ${userToken}`,
                            },
                        } // Arguments pris en compte
                    );
                    if (response.data._id) {
                        // Once the offer published, if ID : Send back to the offer with ID
                        history.push(`/offer/${response.data._id}`);
                    } // Une fois l'offre publier SI ID renvoyer vers l'offre avec vet ID
                } else {
                    const responseModify = await axios.put(
                        `https://project-vinted.herokuapp.com/offer/update/${location.state._id}`,
                        formData,

                        {
                            headers: {
                                authorization: `Bearer ${userToken}`,
                            },
                        } // Arguments pris en compte
                    );
                    if (responseModify) {
                        setMessageModify("Votre annonce a bien été modifiée");
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="bg-offers">
            <div className="publish-container">
                <form onSubmit={handleSubmit}>
                    {!location.state ? (
                        <h2>Vends ton article</h2>
                    ) : (
                        <h2>Modifier l'annonce</h2>
                    )}

                    <div className="form--file">
                        <div>
                            {/* Preview of the photo */}

                            {location.state && (
                                <img
                                    className="preview"
                                    src={file}
                                    alt="product"
                                />
                            )}

                            {preview ? (
                                <>
                                    <img
                                        className="preview"
                                        src={preview}
                                        alt="product"
                                    />

                                    <label
                                        htmlFor="file"
                                        className="label-file"
                                    >
                                        <span>
                                            <FontAwesomeIcon icon="plus" />
                                        </span>
                                        <span>Modifier la photo</span>
                                    </label>
                                </>
                            ) : (
                                !file && (
                                    <label
                                        htmlFor="file"
                                        className="label-file"
                                    >
                                        <span>
                                            <FontAwesomeIcon icon="plus" />
                                        </span>
                                        <span>Ajouter une photo</span>
                                    </label>
                                )
                            )}
                            <input
                                id="file"
                                className="input-file"
                                type="file"
                                onChange={(event) => {
                                    setFile(event.target.files[0]);
                                    setPreview(
                                        URL.createObjectURL(
                                            event.target.files[0]
                                        )
                                    );
                                }}
                            />
                        </div>
                    </div>

                    {/* Form for offers */}
                    <div className="text--form">
                        <div>
                            <label>Titre</label>

                            <input
                                value={title}
                                type="text"
                                placeholder="Titre"
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                value={description}
                                type="text"
                                placeholder="Description"
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="text--form">
                        <div>
                            <label>Marque</label>
                            <input
                                value={brand}
                                type="text"
                                placeholder="Marque"
                                onChange={(event) => {
                                    setBrand(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>Taille</label>
                            <input
                                value={size}
                                type="text"
                                placeholder="Taille"
                                onChange={(event) => {
                                    setSize(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>Couleur</label>
                            <input
                                value={color}
                                type="text"
                                placeholder="Couleur"
                                onChange={(event) => {
                                    setColor(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>Etat</label>
                            <input
                                value={condition}
                                type="text"
                                placeholder="Etat"
                                onChange={(event) => {
                                    setCondition(event.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label>Lieu</label>
                            <input
                                value={city}
                                type="text"
                                placeholder="Lieu"
                                onChange={(event) => {
                                    setCity(event.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="text--form">
                        <div>
                            <label>Prix</label>

                            <input
                                value={price}
                                type="text"
                                placeholder="Prix"
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="publish-button">
                        {!location.state ? (
                            <>
                                <span className="message">{messageModify}</span>

                                <button type="submit">Ajouter</button>
                            </>
                        ) : (
                            <>
                                <span className="message">{messageModify}</span>
                                <button type="submit">Modifier</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormOffer;
