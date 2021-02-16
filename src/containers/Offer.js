import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import loader from "../assets/loader.png";

const Offer = () => {
    const { id } = useParams();
    // Param ID
    // console.log(id);

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://project-vinted.herokuapp.com/offer/${id}`
                );

                // Pour appeler l'offre avec le param ID

                // console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [id]);

    return isLoading ? (
        <div className="loader">
            <img src={loader} alt="loader" />
            <p>En cours de chargement...</p>
        </div>
    ) : (
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
                            {data.product_details.map((elem, indexProduct) => {
                                const keysObj = Object.keys(elem);
                                // console.log(keysObj);
                                // ObjectKeys pour faire apparaitre la clé et la valeur
                                return (
                                    <li key={indexProduct}>
                                        <span>{keysObj[0]}</span>
                                        <span>{elem[keysObj[0]]}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="separation"></div>
                    <div>
                        <p>{data.product_name}</p>
                        <p>{data.product_description}</p>

                        <div>{data.owner.account.username}</div>

                        <button>Acheter</button>
                        {/* <div>
                <img
                    src={data.owner.account.avatar.secure_url}
                    alt={data.owner.account.username}
                />
            </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offer;
