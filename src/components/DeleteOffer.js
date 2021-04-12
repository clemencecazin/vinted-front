import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const DeleteOffer = ({ idOffer, userToken }) => {
    console.log(idOffer);

    const history = useHistory();
    const [trashMessage, setTrashMessage] = useState();

    const removeForm = async () => {
        try {
            if (idOffer) {
                await axios.delete(
                    `https://project-vinted.herokuapp.com/offer/delete/${idOffer}`,
                    {
                        headers: {
                            authorization: `Bearer ${userToken}`,
                        },
                    }
                );
            }

            history.push(`/`);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
            <button
                className="delete-offer"
                onClick={() => {
                    setTrashMessage(
                        <div className="message">
                            Êtes-vous sûre de vouloir supprimer cette annonce ?
                            <div>
                                <button
                                    onClick={() => {
                                        removeForm();
                                    }}
                                >
                                    Oui
                                </button>
                                <button
                                    onClick={() => {
                                        setTrashMessage("");
                                    }}
                                >
                                    Non
                                </button>
                            </div>
                        </div>
                    );
                }}
            >
                Supprimer l'annonce
            </button>

            <div className="message-trash">{trashMessage}</div>
        </>
    );
};

export default DeleteOffer;
