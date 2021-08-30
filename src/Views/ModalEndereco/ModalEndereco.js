import Modal from 'react-bootstrap/Modal'
import * as EnderecoUtils from '../../Utils/Endereco'
import * as EnderecoAction from '../../Store/Actions/Endereco'
import { useEffect, useState } from 'react';
import { connect } from "react-redux";

function ModalEndereco(props) {
    const[inputCod, setInputCod] = useState('')
    const[inputRua, setInputRua] = useState('')
    const[inputCep, setInputCep] = useState('')
    const[inputNumero, setInputNumero] = useState('')
    const[inputTipo, setInputTipo] = useState("Residencial")
    
    useEffect(() => {
        if (props.show) {
            preencherCampos(props.idEndereco)
        } else {
            limparCampos()
        }
    }, [props.show])

    async function preencherCampos(id) {
        var resposta = await EnderecoUtils.GetById(id).then((data) => data)
        if (resposta.status === 200) {
            setInputCod(resposta.data.ID)
            setInputRua(resposta.data.RUA)
            setInputCep(resposta.data.CEP)
            setInputNumero(resposta.data.NUMERO)
            setInputTipo(resposta.data.TIPO)
        }

    }

    async function deletarEndereco(){
        let resposta;
        if (inputCod) {
            resposta = await EnderecoUtils.DeleteById(inputCod).then(data => data)
            props.handleClose()
        } else {
            alert("Sem codigo")
        }
        limparCampos();
    }
    async function salvarEndereco(){
        let resposta
        if(props.idEndereco){
            resposta = await EnderecoUtils.put(props.idEndereco,inputTipo,inputCep,inputRua,inputNumero, props.idCliente)
        }else{
            resposta = await EnderecoUtils.post(inputTipo,inputCep,inputRua,inputNumero, props.idCliente)
        }
        
        if(resposta.status === 200){
            props.handleClose()
        }else{
            alert(resposta.message)
        }
    }
    

    function limparCampos() {
        props.setIdEndereco('')
        setInputCod('')
        setInputRua('')
        setInputCep('')
        setInputNumero('')
        setInputTipo('Residencial')
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Endereço</Modal.Title>
                </Modal.Header>
                <Modal.Body>           
                        <form>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col">
                                        <label>Rua</label>
                                        <input 
                                        type = "text" 
                                        className="form-control"
                                        value={inputRua}
                                        onChange={(event)=> setInputRua(event.target.value)}></input>                                    
                                    </div>                                                                                           
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    
                                    <div className="col-4">
                                        <label>Cep</label>
                                        <input 
                                        type = "text" 
                                        className="form-control"
                                        value={inputCep}
                                        onChange={(event)=> setInputCep(EnderecoUtils.FormataCep(event.target.value))}></input>                                    
                                    </div>
                                    <div className="col">
                                        <label>Numero</label>
                                        <input 
                                        type = "text" 
                                        className="form-control"
                                        value={inputNumero}
                                        onChange={(event) => setInputNumero(event.target.value)}></input>                                    
                                    </div>                                                                                               
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">               
                                    <div className="col">
                                        <label>Tipo</label>
                                        <select 
                                        className = "form-control"
                                        value={inputTipo}
                                        onChange={(event) => setInputTipo(event.target.value)}>
                                            <option value ="Residencial">Residencial</option>
                                            <option value ="Comercial">Comercial</option>
                                            <option value ="Recado">Recado</option>
                                        </select>
                                    </div>                                                                                                
                                </div>
                            </div>
                        </form>
                </Modal.Body>
                <Modal.Footer>
                    {inputCod && (
                        <div className="col d-flex justify-content-start">
                            <button type="button" className="btn btn-danger" onClick={() => deletarEndereco()}>Excluir</button>
                        </div>

                    )}

                    <button type="button" className="btn btn-success" onClick={()=> salvarEndereco()}>Salvar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
const mapStateToProps = (state) => ({
    idCliente: state.Cliente.idCliente,
    idEndereco: state.Endereco.idEndereco

});

const mapDispatchToProps = (dispatch) => ({
    setIdEndereco: (idEndereco) =>
        dispatch(EnderecoAction.setIdEndereco(idEndereco)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEndereco);