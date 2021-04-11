import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Home = ({ data, setData }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://project-vinted.herokuapp.com/offers"
                );
                setData(response.data);

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [setData]);

    return isLoading ? (
        <Loader />
    ) : (
        <div className="offers--container">
            {data.offers.map((offer, index) => {
                return (
                    <div key={offer._id} className="offers--container--product">
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
                                <span>{offer.product_price} €</span>

                                <div>
                                    {offer.product_details.map(
                                        (details, indeximg) => {
                                            return (
                                                <div key={indeximg}>
                                                    <span>
                                                        {details.MARQUE}
                                                    </span>
                                                    <span>
                                                        {details.TAILLE}
                                                    </span>
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
