import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Filter from "./Filter";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userToken, setUser, data, setData }) => {
    const [resultSearch, setresultSearch] = useState();

    const search = (event) => {
        const input = event.target.value;
        console.log(event.target.value);
        // console.log(data.offers);
        setresultSearch(input);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://project-vinted.herokuapp.com/offers/?title=${resultSearch}`
                );

                setData(response.data);

                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [resultSearch, setData]);

    return (
        <header>
            <div className="header--container">
                <div className="header--logo">
                    <Link to="/">
                        <img src={logo} alt="Logo Vinted" />
                    </Link>
                </div>
                <div>
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Rechercher des articles"
                        onChange={search}
                    />
                    <span className="search-input-icon">
                        <FontAwesomeIcon icon="search" />
                    </span>
                    <Filter />
                </div>

                {userToken ? (
                    <>
                        <span>Bonjour</span>

                        <button
                            className="signout"
                            onClick={() => setUser(null)}
                        >
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <>
                        <div className="login-signup">
                            <Link
                                className="header--button-login-signup"
                                to="/login"
                            >
                                Se connecter
                            </Link>
                            <Link
                                className="header--button-login-signup"
                                to="/signup"
                            >
                                S'inscrire
                            </Link>
                        </div>

                        <button className="header--button-sold">
                            Vends tes articles
                        </button>
                    </>
                )}
            </div>
        </header>
        // Si on a un userToken le bouton se Déconnecter apparait sinon c'est Se connecter et s'inscrire
    );
};

export default Header;
