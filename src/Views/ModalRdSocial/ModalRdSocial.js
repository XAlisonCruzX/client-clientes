import Modal from 'react-bootstrap/Modal'

function ModalRdSocial(props) {
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
                                        <input type = "text" className="form-control"></input>
                                        
                                    </div>
                                    <div className="col">
                                        <label>Tipo</label>
                                        <select className = "form-control">
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
                    <button type="button" className="btn btn-success">Salvar</button>
                </Modal.Footer>
            </Modal>

        </div>

    )

}

export default ModalRdSocial;