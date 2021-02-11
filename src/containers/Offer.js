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
                    `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
        <>
            <div>Coucou</div>

            <div>{data.product_name}</div>
            <div>{data.product_price}</div>
            <div>{data.product_description}</div>

            <div>{data.owner.account.username}</div>

            <div>
                <img
                    src={data.owner.account.avatar.secure_url}
                    alt={data.owner.account.username}
                />
            </div>

            {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                console.log(keys);
                return (
                    <div>
                        <span>{keys[0]}</span>
                        <span>{elem[keys[0]]}</span>
                    </div>
                );
            })}
        </>
    );
};

export default Offer;
