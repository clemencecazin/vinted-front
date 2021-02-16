import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = ({ userToken }) => {
    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [form, setForm] = useState("display");

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const formData = new FormData(); // Nouvel Objet
            formData.append("picture", file);
            formData.append("title", title); // Name Back et value
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);

            const response = await axios.post(
                "https://project-vinted.herokuapp.com/offer/publish",
                formData,
                {
                    headers: {
                        authorization: `Bearer ${userToken}`,
                    },
                } // Paramètres pris en compte
            );
            console.log(response.data);
            setData(response.data); // On stock le résultat pour pouvoir renvoyer les éléments dans la page
            setIsLoading(false);

            setForm("hidden");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="bg-offers">
            <div className="publish-container">
                <form className={form} onSubmit={handleSubmit}>
                    <h2>Vends ton article</h2>

                    <div className="form--file">
                        <div>
                            <label htmlFor="file" className="label-file">
                                <span>
                                    <FontAwesomeIcon icon="plus" />
                                </span>
                                <span>Ajouter une photo</span>
                            </label>
                            <input
                                id="file"
                                className="input-file"
                                type="file"
                                onChange={(event) => {
                                    // console.log(event);
                                    setFile(event.target.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="text--form">
                        <div>
                            <label>Titre</label>

                            <input
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
                                type="text"
                                placeholder="Prix"
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                            />
                        </div>
                        {/* <div className="checkbox">
                            <input type="checkbox" />
                            Je suis intéressé(e) par les échanges
                        </div> */}
                    </div>
                    <div className="publish-button">
                        <button type="submit">Ajouter</button>
                    </div>
                </form>

                {isLoading ? (
                    <p>...</p>
                ) : (
                    <>
                        <div className="bg-offers">
                            <div className="offers--container offers">
                                <div className="offers-picture">
                                    <img
                                        src={data.product_image.secure_url}
                                        alt={data.product_name}
                                    />
                                </div>

                                <div className="offers--infos">
                                    <div>
                                        <span>{data.product_price} €</span>

                                        <ul>
                                            {data.product_details.map(
                                                (elem, index) => {
                                                    const keysObj = Object.keys(
                                                        elem
                                                    );

                                                    return (
                                                        <li>
                                                            <span>
                                                                {keysObj[0]}
                                                            </span>
                                                            <span>
                                                                {
                                                                    elem[
                                                                        keysObj[0]
                                                                    ]
                                                                }
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                    <div className="separation"></div>
                                    <div>
                                        <p>{data.product_name}</p>
                                        <p>{data.product_description}</p>

                                        <div>{data.owner.account.username}</div>

                                        <button>Acheter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Publish;
