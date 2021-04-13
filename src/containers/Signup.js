import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser, setIdUser }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://project-vinted.herokuapp.com/user/signup",
                    {
                        username: username,
                        email: email,
                        phone: phone,
                        password: password,
                    }
                    // Send the informations to DB
                );
                if (response.data._id) {
                    setIdUser(response.data._id);
                }
                if (response.data.token) {
                    setUser(response.data.token);
                    history.push("/");
                }
            } catch (error) {
                console.log(error);
                setErrorMessage(
                    <div>Le formulaire n'est pas bien rempli !</div>
                );
                if (error.response) {
                    console.log(error.response.message);
                }
            }
        };
        fetchData();
    };

    // OnClick we are calling the API signup, pass all the informations from the form. Save the token in setUser function to keep him in memory.

    return (
        <div className="signup-container">
            <h2>S'inscrire</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(event) => {
                        setPhone(event.target.value);
                    }}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />

                <button type="submit">Submit</button>
                <div>{errorMessage}</div>
            </form>
            <Link to="/Login">Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
    );
};

export default Signup;
