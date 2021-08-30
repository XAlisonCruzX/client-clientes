import Modal from 'react-bootstrap/Modal'
import * as ClienteAction from '../../Store/Actions/Cliente'
import * as ClienteUtils from  '../../Utils/Cliente'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";


function ModalConfirmacao(props) {
    const historico = useHistory()

    async function deletarCliente() {
        let resposta;
        
        if (props.idCliente) {
          resposta = await ClienteUtils.DeleteById(props.idCliente).then(data => data)
          historico.push("/")
        } else {
          alert("Sem codigo")
        }
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar Contato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label>Ação irreversivel deseja continuar?</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>  
                    <div className="col d-flex justify-content-start">
                        <button type="button" className="btn btn-danger" onClick={() => deletarCliente()}>Excluir</button>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button type="button" className="btn btn-success" onClick={() => props.handleClose()}>Cancelar</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

const mapStateToProps = (state) => ({
    idCliente: state.Cliente.idCliente
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setIdCliente: (idCliente) => dispatch(ClienteAction.setIdCliente(idCliente))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmacao);