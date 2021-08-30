import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { setIdEndereco } from '../../Store/Actions/Endereco'
import * as RedeSocialUtils from '../../Utils/RedeSocial'
import * as RedeSocialAction from '../../Store/Actions/RedeSocial'


function ModalRdSocial(props) {
    const[inputCod, setInputCod] = useState('')
    const[inputReferencia, setInputReferencia] = useState('')
    const[inputTipo, setInputTipo] = useState('Facebook')

    useEffect(() => {
        if (props.show) {
            preencherCampos()
        } else {
            limparCampos()
        }
    }, [props.show])


    function limparCampos(){
        props.setIdRedeSocial('')
        setInputCod('')
        setInputReferencia('')
        setInputTipo('Facebook')
    }

    async function salvarRedeSocial(){
        let resposta
        if(props.idRedeSocial){
            resposta = await RedeSocialUtils.put(props.idRedeSocial, inputTipo, inputReferencia, props.idCliente)
        }else{
            resposta = await RedeSocialUtils.post(inputTipo, inputReferencia, props.idCliente)
        }
        
        if(resposta.status === 200){
            props.handleClose()
        }else{
            alert(resposta.message)
        }
    }

    async function deletarRedeSocial(){
        let resposta;
        if (inputCod) {
            resposta = await RedeSocialUtils.DeleteById(inputCod).then(data => data)
            props.handleClose()
        } else {
            alert("Sem codigo")
        }
        limparCampos();
    }

    async function preencherCampos(){
        var resposta = await RedeSocialUtils.GetById(props.idRedeSocial).then(data => data)
        if(resposta.status === 200){
            setInputCod(resposta.data.ID)
            setInputReferencia(resposta.data.REFERENCIA)
            setInputTipo(resposta.data.NOME)
        }else{
            alert(resposta.message)
            limparCampos()
        }
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
                                        <label>Referencia</label>
                                        <input 
                                        type = "text" 
                                        className="form-control"
                                        value={inputReferencia}
                                        onChange={(event) => setInputReferencia(event.target.value)}></input>
                                        
                                    </div>
                                    <div className="col">
                                        <label>Tipo</label>
                                        <select 
                                        className = "form-control"
                                        value={inputTipo}
                                        onChange={(event) => setInputTipo(event.target.value)}>
                                            <option value ="Facebook">Facebook</option>
                                            <option value ="Instagram">Instagram</option>
                                            <option value ="Twitter">Twitter</option>
                                            <option value ="LinkedIn">LinkedIn</option>
                                        </select>
                                    </div>
                                   
                                </div>
                            </div>
                        </form>

                </Modal.Body>
                <Modal.Footer>
                    {inputCod && (
                        <div className="col d-flex justify-content-start">
                            <button type="button" className="btn btn-danger" onClick={() => deletarRedeSocial()}>Excluir</button>
                        </div>

                    )}
                    <button type="button" className="btn btn-success" onClick={() => salvarRedeSocial()}>Salvar</button>
                </Modal.Footer>
            </Modal>

        </div>

    )

}

const mapStateToProps = (state) => ({
    idCliente: state.Cliente.idCliente,
    idRedeSocial: state.RedeSocial.idRedeSocial

});

const mapDispatchToProps = (dispatch) => ({
    setIdRedeSocial: (idRedeSocial) =>
        dispatch(RedeSocialAction.setIdRedeSocial(idRedeSocial)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRdSocial);