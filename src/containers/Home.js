import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ data, setData }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://project-vinted.herokuapp.com/offers"
                );
                setData(response.data);
                console.log(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [setData]);

    // return <Link to={`/offer/`}> Go</Link>;

    // console.log(data);

    return isLoading ? (
        <p>En cours de chargement...</p>
    ) : (
        <div className="offers--container">
            {data.offers.map((offer, index) => {
                // console.log(offers);
                return (
                    <div key={offer._id}>
                        <Link to={`/offer/${offer._id}`}>
                            <div className="owner">
                                <div>
                                    <span>{offer.owner.account.username}</span>
                                    {offer.owner.account.avatar ? (
                                        <img
                                            src={
                                                offer.owner.account.avatar
                                                    .secure_url
                                            }
                                            alt={offer.owner.account.username}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>

                            <div>
                                <img
                                    src={offer.product_image.secure_url}
                                    alt={offer.product_name}
                                />
                            </div>
                            <div>
                                {/* {offer._id} */}
                                <span>{offer.product_price} €</span>
                                {/* <div>
                                    {offer.product_pictures.map(
                                        (imagesrc, indeximg) => {
                                            return (
                                                <img
                                                    src={imagesrc.secure_url}
                                                    alt={offer.product_name}
                                                />
                                            );
                                        }
                                    )}
                                </div> */}

                                <div>
                                    {offer.product_details.map(
                                        (details, indeximg) => {
                                            return (
                                                <>
                                                    <span>
                                                        {details.MARQUE}
                                                    </span>
                                                    <span>
                                                        {details.TAILLE}
                                                    </span>
                                                </>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
