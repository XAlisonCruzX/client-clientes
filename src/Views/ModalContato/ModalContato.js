import Modal from 'react-bootstrap/Modal'
import * as ContatoUtils from '../../Utils/Contato'
import * as ContatoAction from '../../Store/Actions/Contato'
import { connect } from "react-redux"
import { useEffect, useState } from 'react'
import Contato from '../../Store/Reducers/Contato'

function ModalContato(props) {
    const [inputCod, setInputCod] = useState('')
    const [inputNumero, setInputNumero] = useState('')
    const [inputTipo, setInputTipo] = useState("Comercial")

    useEffect(() => {
        if (props.show) {
            preencherCampos(props.idContato)
        } else {
            limparCampos()
        }
    }, [props.show])

    async function preencherCampos(id) {
        var resposta = await ContatoUtils.GetById(id).then((data) => data)
        if (resposta.status === 200) {
            setInputCod(resposta.data.ID)
            setInputNumero(resposta.data.NUMERO)
            setInputTipo(resposta.data.TIPO)
        }

    }

    function limparCampos() {
        props.setIdContato('')
        setInputCod('')
        setInputNumero('')
        setInputTipo("Comercial")
    }

    async function salvarContato() {
        let resposta;

        if (props.idContato) {
            resposta = await ContatoUtils.put(props.idContato, inputTipo, inputNumero, props.idCliente).then(data => data)
        } else {
            resposta = await ContatoUtils.post(inputTipo, inputNumero, props.idCliente).then(data => data)
        }

        if (resposta.status === 200) {
            props.handleClose()
        } else {
            alert(resposta.message)
        }
    }

    async function deletarContato(id) {
        let resposta;
        if (inputCod) {
            resposta = await ContatoUtils.DeleteById(id).then(data => data)
            props.handleClose()
        } else {
            alert("Sem codigo")
        }
        limparCampos();
    }


    return (

        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contato</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label>Numero</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={inputNumero}
                                        onChange={(event) => setInputNumero(ContatoUtils.FormataTelefone(event.target.value))}></input>

                                </div>
                                <div className="col">
                                    <label>Tipo</label>
                                    <select
                                        className="form-control"
                                        value={inputTipo}
                                        onChange={(event) => setInputTipo(event.target.value)}>
                                        <option value="Residencial">Residencial</option>
                                        <option value="Comercial">Comercial</option>
                                        <option value="Recado">Recado</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>


                    {inputCod && (
                        <div className="col d-flex justify-content-start">
                            <button type="button" className="btn btn-danger" onClick={() => deletarContato(inputCod)}>Excluir</button>
                        </div>

                    )}

                    <div className="col d-flex justify-content-end">
                        <button type="button" className="btn btn-success" onClick={() => salvarContato()}>Salvar</button>
                    </div>


                </Modal.Footer>
            </Modal>

        </div>

    )

}

const mapStateToProps = (state) => ({
    idCliente: state.Cliente.idCliente,
    idContato: state.Contato.idContato

});

const mapDispatchToProps = (dispatch) => ({
    setIdContato: (idContato) =>
        dispatch(ContatoAction.setIdContato(idContato)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContato);