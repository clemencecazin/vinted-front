import { Link } from "react-router-dom";

const Home = ({ data, setData }) => {
    // return <Link to={`/offer/`}> Go</Link>;

    // console.log(data);

    return (
        <div>
            {data.map((offers, index) => {
                // console.log(offers);
                return (
                    <>
                        <div className="offers" key={offers.id}>
                            {offers.product_price}
                            {/* <div>
                            {offers.product_pictures.map(
                                (imagesrc, indeximg) => {
                                    return (
                                        <img
                                            src={imagesrc.secure_url}
                                            alt={offers.product_name}
                                        />
                                    );
                                }
                            )}
                        </div> */}

                            <div>
                                {offers.product_details.map(
                                    (details, indeximg) => {
                                        return (
                                            <div>
                                                {details.MARQUE}{" "}
                                                {details.TAILLE}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <div>
                                <img
                                    src={offers.product_image.secure_url}
                                    alt={offers.product_name}
                                />
                            </div>
                            <div>
                                <div className="owner">
                                    {offers.owner.account.username}
                                    {offers.owner.account.avatar ? (
                                        <img
                                            src={
                                                offers.owner.account.avatar
                                                    .secure_url
                                            }
                                            alt={offers.owner.account.username}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
};

export default Home;
