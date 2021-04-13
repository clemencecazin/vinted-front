import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import DeleteOffer from "../components/DeleteOffer";

const Offer = ({ userId, userToken }) => {
    console.log(userId);
    const { id } = useParams();
    // Param ID

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://project-vinted.herokuapp.com/offer/${id}`
                );

                // Call the offer with param ID
                console.log(response.data);
                setData(response.data);

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [id]);

    return isLoading ? (
        <Loader />
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

                        {/* Send to payment page with informations */}

                        {userId && userId === data.owner._id ? (
                            <>
                                <DeleteOffer
                                    idOffer={data._id}
                                    userToken={userToken}
                                />
                                <Link
                                    to={{
                                        pathname: "/modify",
                                        state: data,
                                    }}
                                >
                                    Modifier l'annonce
                                </Link>
                            </>
                        ) : (
                            <Link to={{ pathname: "/payment", state: data }}>
                                Acheter
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offer;
