import { useState, useEffect, useContext } from "react";
import Title from "../../components/Title";
import Header from "../../components/Header";
import {
  FiAlignLeft,
  FiAlignJustify,
  FiArrowUpCircle,
  FiEdit,
  FiLink,
} from "react-icons/fi";
import firebase from "../../services/firebaseConnection";
import { format } from "date-fns";
import "./register.css";
import "./customers.css";
import RingLoader from "react-spinners/RingLoader";
import { AuthContext } from "../../contexts/auth";

const md5 = require("md5");

const listUrl = firebase.firestore().collection("UrlEncurtada");

export default function Encurtador() {

  const { user, setUser, storageUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [uid, setUid] = useState(user && user.uid);
  const [listUrlEncurtada, setListUrlEncurtada] = useState([]);
  const [busca, setBusca] = useState("");
  const [urloriginal, setUrloriginal] = useState("");
  const [urloriginalmanual, setUrloriginalmanual] = useState("");

  useEffect(() => {
    loadListUrl();
  }, []);

  // Faz o get na collection UrlEncurtada e traz o array percorrido da function updateStateUrl e limita as linhas.
  async function loadListUrl() {
    await listUrl
      .limit(2000)
      .get()
      .then((snapshot) => {
        updateStateUrl(snapshot);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // ----------------------------------------------------------------------------------------

  // Percorre  e inseri os dados da collection na useState ListProfessorss
  async function updateStateUrl(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          uid: doc.uid,
          Usuario: doc.data().Usuario,
          email: doc.data().email,
          token: doc.data().token,
          uidUsuario: doc.data().uidUsuario,
          created: doc.data().created,
          createdFormated: format(
            doc.data().created.toDate(),
            "dd/MM/yyyy kk:mm:ss"
          ),
          urlencurtada: doc.data().urlencurtada,
          urloriginal: doc.data().urloriginal,
        });
      });

      // sort está ordenado em ascendente a ultima linha sempre será o ultimo registro enviado
      setListUrlEncurtada((dashboards) =>
        [...dashboards, ...lista].sort((a, b) => a.created - b.created)
      );

    }
  }
  // ----------------------------------------------------------------------------------------

  // Função que irá criar a collection e enviar os dados gerado o md5 automatico
  async function handleUpload() {
    var token = urloriginal;

    await firebase
      .firestore()
      .collection("UrlEncurtada")
      .doc(md5(urloriginal))
      .set({
        urlencurtada: `https://encutador-link.firebaseapp.com/E/${md5(urloriginal)}`,
        created: new Date(),
        urloriginal: urloriginal,
        token: md5(token),
        Usuario: nome,
        email: email,
        uidUsuario: uid,
      })

      .then(() => {
        let data = {
          ...user,
          nome: nome,
        };
        setUser(data);
        storageUser(data);
        setLoading(true);
      });

    setTimeout(function () {
      window.location.reload(1);
    }, 1000);
  }
  // Cancela o evento se for cancelável, sem parar a propagação do mesmo.
  async function handleSave(e) {
    e.preventDefault();

    if (nome !== "") {
      handleUpload();
    }
  }

  // ----------------------------------------------------------------------------------------

  // Função que irá criar a collection e enviar os dados repassado de forma manual
  async function handleUploadManual() {

    await firebase
      .firestore()
      .collection("UrlEncurtada")
      .doc(urloriginalmanual)
      .set({
        urlencurtada: `https://encutador-link.firebaseapp.com/E/${urloriginalmanual}`,
        created: new Date(),
        urloriginal: urloriginal,
        token: urloriginalmanual,
        Usuario: nome,
        email: email,
        uidUsuario: uid,
      })

      .then(() => {
        let data = {
          ...user,
          nome: nome,
        };
        setUser(data);
        storageUser(data);
        setLoading(true);
      });

    setTimeout(function () {
      window.location.reload(1);
    }, 1000);
  }
  // Cancela o evento se for cancelável, sem parar a propagação do mesmo.
  async function handleSaveManual(e) {
    e.preventDefault();

    if (nome !== "") {
      handleUploadManual();
    }
  }
  // ----------------------------------------------------------------------------------------

  return (
    <>
      <div>
        <Header />

        <div className="content">
          <Title name="Encurtador de Links">
            <FiLink size={25} style={{ color: "#BF0404" }} />
          </Title>
          {loading ? (
            <>
              <strong style={{ marginLeft: "50px" }}>
                Link Gerado com Sucesso!
              </strong>
              <RingLoader
                cssOverride={{ marginLeft: "10px", marginTop: "-25px" }}
                size={30}
                color={"#D0021B"}
                loading={loading}
                speedMultiplier={1.5}
              />
            </>
          ) : (
            <div></div>
          )}

          <hr />
          <div className="mt-3">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <p class="nav-link active" data-bs-toggle="tab" href="#menu1">
                  <FiEdit size={20} style={{ color: "#BF0404" }} /> Encurtar
                  Link Automático
                </p>
              </li>

              <li class="nav-item">
                <p class="nav-link" data-bs-toggle="tab" href="#menu2">
                  <FiAlignLeft size={20} style={{ color: "#BF0404" }} /> Links{" "}
                </p>
              </li>

              <li class="nav-item">
                <p class="nav-link" data-bs-toggle="tab" href="#menu3">
                  <FiEdit size={20} style={{ color: "#BF0404" }} />{" "}
                  Encurtar Link Manual
                </p>
              </li>
            </ul>

            <div class="tab-content">
              <div id="menu1" class="container tab-pane active">
                <form className="form-profile customers" onSubmit={handleSave}>
                  <label style={{ marginBottom: "25px" }}>
                    Encurte seu link:
                  </label>
                  <div id="#link">
                    <label style={{ marginRight: "10px" }}>Encurtar: </label>
                    <input
                      style={{ marginRight: "10px", width: "300px" }}
                      type="text"
                      placeholder="Cole aqui seu link http://encurtar-link/"
                      onChange={(e) => setUrloriginal(e.target.value)}
                    ></input>
                    <button
                      type="submit"
                      style={{
                        color: "white",
                        backgroundColor: "#6a833d",
                        width: "200px",
                        marginRight: "15px",
                      }}
                    >
                      <FiArrowUpCircle /> Gerar Link
                    </button>
                    <br />
                    <strong style={{ marginRight: "15px" }}>
                      Como vai ficar seu Link:{" "}
                    </strong>{" "}
                    {urloriginal === "" ? (
                      <div></div>
                    ) : (
                      `https://encutador-link.firebaseapp.com/E/${md5(urloriginal)}`
                    )}
                  </div>
                </form>
              </div>

              <div id="menu2" class="container tab-pane ">
                <br />

                {/* Input de busca */}
                <div>
                  <div class="col-md-4">
                    <div class="input-group">
                      <input
                        onChange={(e) => setBusca(e.target.value)}
                        class="form-control border-end-0 border rounded-pill"
                        type="search"
                        placeholder="Pesquisar..."
                        id="example-search-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th scope="col">
                          <FiAlignJustify size={20} />
                        </th>
                        <th scope="col">URL ENCURTADA</th>
                        <th scope="col">URL ORIGINAL</th>
                        <th scope="col">DATA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Filtrando na pesquisa */}
                      {listUrlEncurtada
                        .filter((pesquisar) => {
                          if (busca == "") {
                            return pesquisar;
                          } else if (
                            pesquisar.urlencurtada
                              .toLowerCase()
                              .includes(busca.toLowerCase())
                          ) {
                            return pesquisar;
                          } else if (
                            pesquisar.urloriginal
                              .toLowerCase()
                              .includes(busca.toLowerCase())
                          ) {
                            return pesquisar;
                          }
                        })
                        .map((item, index) => {
                          if (user.uid === item.uidUsuario) {
                            return (
                              <tr key={index}>
                                <td data-label="index">{index + 1}</td>
                                <td data-label="urlencurtada">
                                  {item.urlencurtada}
                                </td>
                                <td data-label="urloriginal">
                                  {item.urloriginal}
                                </td>
                                <td data-label="data">{item.createdFormated}</td>
                              </tr>
                            );
                          } else {
                            <td colSpan="4"></td>
                          }
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="menu3" class="container tab-pane fade">
                <form className="form-profile customers" onSubmit={handleSaveManual}>
                  <label style={{ marginBottom: "25px" }}>
                    Encurte seu link:
                  </label>
                  <div id="#link">
                    <label style={{ marginRight: "10px" }}>Encurtar: </label>
                    <input
                      style={{ marginRight: "10px", width: "300px" }}
                      type="text"
                      placeholder="Cole aqui seu link http://encurtar-link/"
                      onChange={(e) => setUrloriginal(e.target.value)}
                    ></input>
                    <label style={{ marginRight: "10px" }}>Digite um nome: </label>
                    <input
                      style={{ marginRight: "10px", width: "300px" }}
                      type="text"
                      placeholder="Digite um nome para seu link"
                      onChange={(e) => setUrloriginalmanual(e.target.value)}
                    ></input>
                    <button
                      type="submit"
                      style={{
                        color: "white",
                        backgroundColor: "#6a833d",
                        width: "200px",
                        marginRight: "15px",
                      }}
                    >
                      <FiArrowUpCircle /> Gerar Link
                    </button>

                    <strong style={{ marginRight: "15px" }}>
                      Como vai ficar seu Link:{" "}
                    </strong>{" "}
                    {urloriginal === "" ? (
                      <div></div>
                    ) : (
                      `https://encutador-link.firebaseapp.com/E/${urloriginalmanual}`
                    )}
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
