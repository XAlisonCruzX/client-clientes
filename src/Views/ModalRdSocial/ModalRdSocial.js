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
            
        } else {
            limparCampos()
        }
    }, [props.show])


    function limparCampos(){
        props.setIdRedeSocial('')
        setInputCod('')
        setInputTipo('Facebook')
        setInputReferencia('')
    }

    async function salvarRedeSocial(){
        var resposta = await RedeSocialUtils.post(inputTipo, inputReferencia, props.idCliente)
        if(resposta === 200){
            props.handleClose()
        }else{
            alert(resposta.message)
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
                    <button type="button" className="btn btn-success" onClick={() => salvarRedeSocial()}>Salvar</button>
                </Modal.Footer>
            </Modal>

        </div>

    )

}

const mapStateToProps = (state) => ({
    idCliente: state.Cliente.idCliente,
    idRedeSocial: state.Contato.idRedeSocial

});

const mapDispatchToProps = (dispatch) => ({
    setIdRedeSocial: (idRedeSocial) =>
        dispatch(RedeSocialAction.setIdRedeSocial(idRedeSocial)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRdSocial);