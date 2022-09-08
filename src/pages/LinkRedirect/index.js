import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';
import { useParams } from 'react-router-dom';
import PacmanLoader from "react-spinners/PacmanLoader";

export default function LinkRedirect() {

    const { id } = useParams();
    const [url, setUrl] = useState('');

    useEffect(() => {

        loadId();
        redirecionar();


    }, []);


    // Carregar o link no formulario
    async function loadId() {

        await firebase.firestore().collection('UrlEncurtada').doc(id)
            .get()
            .then((snapshot) => {
                setUrl(snapshot.data().urloriginal);

            })
            .catch((err) => {
                console.log('Error no ID passado: ', err)
                alert('Não encontramos seu link')
            })

        // Evento de click para chamar função de redirecionamento
        window.onload = function () {
            document.getElementById("clickautomatico").click();
        }

    }

    // faz o redirect caso a url não seja vazia
    function redirecionar() {

        if (url !== '') {
            window.location = url
        }
    }


    return (
        <>
            <div>

                <div className="content">

                    <div className="container">
                        <form className="form-profile customers" onSubmit={loadId} hidden>
                            <label>Link: </label>
                            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="url"></input>
                            <input type="button" onclick={redirecionar()} id="clickautomatico"></input>
                        </form>
                        <PacmanLoader
                            cssOverride={{ marginLeft: "10px", marginTop: "0px" }}
                            size={20}
                            color={"#D0021B"}
                            loading={true}
                            speedMultiplier={1.2}
                        />
                        <strong style={{ marginRight: '10px', marginLeft: '80px', marginTop: '15px' }}>Estamos tentando localizar seu link! </strong>
                        <span style={{ color: '#D0021B', marginTop: '15px' }}> Caso demore a redirecionar, verifique se o endereço está digitado corretamente, ou se ao criar colocou um link válido!</span>
                    </div>

                </div>

            </div>

        </>
    )
}