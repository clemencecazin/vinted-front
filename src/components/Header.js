import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userToken, setUser, data, setData, owner }) => {
    const [resultSearch, setresultSearch] = useState();

    const search = (event) => {
        const input = event.target.value;

        setresultSearch(input); // Stock data
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://project-vinted.herokuapp.com/offers/?title=${resultSearch}`
                );
                // Calling the filters offers
                setData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [resultSearch, setData]);
    // Value called, resultSearch and setData

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
                </div>

                {userToken ? (
                    <>
                        <button
                            className="signout"
                            onClick={() => setUser(null)}
                        >
                            Se déconnecter
                        </button>
                        <Link to="/Publish" className="header--button-sold">
                            Vends tes articles
                        </Link>
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

                        {/* If the user is identified thanks to the Token, access to publish page else login */}

                        <Link to="/Publish" className="header--button-sold">
                            Vends tes articles
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
