import { useState } from "react";
import axios from "axios";

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
        <div className="publish-container">
            <div className={form}>
                <form onSubmit={handleSubmit}>
                    <h2>Vends ton article</h2>

                    <input
                        type="file"
                        onChange={(event) => {
                            // console.log(event);
                            setFile(event.target.files[0]);
                        }}
                    />
                    <label>Titre</label>
                    <input
                        type="text"
                        placeholder="Titre"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Description"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />

                    <label>Marque</label>
                    <input
                        type="text"
                        placeholder="Marque"
                        onChange={(event) => {
                            setBrand(event.target.value);
                        }}
                    />
                    <label>Taille</label>
                    <input
                        type="text"
                        placeholder="Taille"
                        onChange={(event) => {
                            setSize(event.target.value);
                        }}
                    />
                    <label>Couleur</label>
                    <input
                        type="text"
                        placeholder="Couleur"
                        onChange={(event) => {
                            setColor(event.target.value);
                        }}
                    />
                    <label>Etat</label>
                    <input
                        type="text"
                        placeholder="Etat"
                        onChange={(event) => {
                            setCondition(event.target.value);
                        }}
                    />
                    <label>Lieu</label>
                    <input
                        type="text"
                        placeholder="Lieu"
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                    />

                    <label>Prix</label>
                    <input
                        type="text"
                        placeholder="Prix"
                        onChange={(event) => {
                            setPrice(event.target.value);
                        }}
                    />

                    <button type="submit">Ajouter</button>
                </form>
            </div>

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
                                                            {elem[keysObj[0]]}
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
    );
};

export default Publish;
