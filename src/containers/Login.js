import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://project-vinted.herokuapp.com/user/login",
                    { email: email, password: password }
                );

                // console.log(response.data);
                if (response.data.token) {
                    setUser(response.data.token);

                    console.log(response.data.token);

                    history.push("/");
                }
            } catch (error) {
                console.log(error);
                setErrorMessage(
                    "Le mail ou/et le mot de passe n'est pas correct"
                );
                if (error.response) {
                    console.log(error.response.message);
                }
            }
        };
        fetchData();
    };

    // Au clic on appelle l'API login on vérifie si me mdp et user sont valides, on enregistre le token retourné dans la fonction setUser
    // History permet de renvoyer vers la page sur laquelle on était

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(event) => {
                        console.log(event.target.value);

                        setEmail(event.target.value);
                    }}
                />

                <input
                    type="password"
                    onChange={(event) => {
                        console.log(event.target.value);

                        setPassword(event.target.value);
                    }}
                />

                <button type="submit">Se connecter</button>
                <span>{errorMessage}</span>
            </form>
        </div>
    );
};

export default Login;
