import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://project-vinted.herokuapp.com/offers"
            );
            setData(response.data);
            console.log(response.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    // return <Link to={`/offer/`}> Go</Link>;

    // console.log(data);

    return isLoading ? (
        <p>En cours de chargement...</p>
    ) : (
        <div className="offers">
            {data.offers.map((offer, index) => {
                // console.log(offers);
                return (
                    <div key={offer._id}>
                        <Link to={`/offer/${offer._id}`}>
                            <div className="owner">
                                {offer.owner.account.username}
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

                            <div>
                                <img
                                    src={offer.product_image.secure_url}
                                    alt={offer.product_name}
                                />
                            </div>
                            <div>
                                {/* {offer._id} */}
                                {offer.product_price}
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
                                                <div>
                                                    {details.MARQUE}
                                                    {details.TAILLE}
                                                </div>
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
