import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState();

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://project-vinted.herokuapp.com/user/signup",
                    { username, email, phone, password }
                );
                setData(response.data);
                console.log(response.data);

                setUser(response.data.token);
                history.push("/");
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    };

    // Au clic on fait appelle à l'API signup et on lui passe les informations du formulaire, on passe le token dans la fonction setUser, pour qu'elle garde le token en mémoire

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => {
                    console.log(event.target.value);

                    setUsername(event.target.value);
                }}
            />

            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(event) => {
                    console.log(event.target.value);

                    setEmail(event.target.value);
                }}
            />

            <input
                type="text"
                placeholder="phone"
                value={phone}
                onChange={(event) => {
                    console.log(event.target.value);

                    setPhone(event.target.value);
                }}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => {
                    console.log(event.target.value);

                    setPassword(event.target.value);
                }}
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default Signup;
