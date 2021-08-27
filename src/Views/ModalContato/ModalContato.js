import Modal from 'react-bootstrap/Modal'

function ModalContato(props) {
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
                                        <input type = "text" className="form-control"></input>
                                        
                                    </div>
                                    <div className="col">
                                        <label>Tipo</label>
                                        <select className = "form-control">
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
                    <button type="button" className="btn btn-success">Salvar</button>
                </Modal.Footer>
            </Modal>

        </div>

    )

}

export default ModalContato;