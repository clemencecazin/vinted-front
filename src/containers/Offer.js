import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
    const { id } = useParams();
    // console.log(id);

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://project-vinted.herokuapp.com/offer/${id}`
                );
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
        <p>En cours de chargement...</p>
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
                            {data.product_details.map((elem, index) => {
                                const keysObj = Object.keys(elem);
                                console.log(keysObj);
                                return (
                                    <li>
                                        <span>{keysObj[0]}</span>
                                        <span>{elem[keysObj[0]]}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div class="separation"></div>
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
