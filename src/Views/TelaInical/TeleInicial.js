
import { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as ClienteUtils from '../../Utils/Cliente'
import * as ClienteAction from '../../Store/Actions/Cliente'
import './TelaInicial.css';

function TelaInicial(props) {
    const[numeroPagina, setNumeroPagina] = useState(0);
    const[listaClientesDisplay, setClientesDisplay] = useState([])
    const[quantTotalRegistros, setQuantTotalRegistros] = useState(0)
    const[nomeBuscar, setNomeBuscar] = useState('')
    const quantPagina = 5;
    const historico = useHistory()

    useEffect(()=>{
        listarCliente(numeroPagina, quantPagina, nomeBuscar)
    },[numeroPagina])
    useEffect(()=>{
        setNumeroPagina(0)
        listarCliente(0, quantPagina, nomeBuscar)
    },[nomeBuscar])
    



    async function listarCliente(pag, quant, nome){
        const resposta = await ClienteUtils.GetClientePag(pag, quant, nome).then((data) => data)
        if(resposta.status === 200){

            let listaClientes;
            listaClientes = resposta.data.listaCliente.map((cliente)=>{
                return(<>
                    <div className="itens" onClick={() =>props.setIdCliente(cliente.ID, historico.push("/Cadastro"))}>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-8">
                                    <label>Nome:</label>
                                    <label className="" name="nome">{cliente.NOME}</label>
                                </div>
                                <div className="col-4">
                                    <label>Nascimento:</label>
                                    <label className="" name="nome">{cliente.DATA_NASCIMENTO.substring(0,10)}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)

            })
            setQuantTotalRegistros(resposta.data.quantTamLista)
            setClientesDisplay(listaClientes)
            
            
        }
    }

    return (
        <>
            <div className="form-group">
                <div className="form-row">
                    <div className="col-4">
                        <label>Nome</label>
                        <input type="text" className="form-control"
                        value={nomeBuscar}
                        onChange={(event)=> setNomeBuscar(event.target.value)}/>
                    </div>

                </div>
            </div>


            <div className="d-flex justify-content-start">
                <label>Clientes</label>
            </div>

            <div className="lista-itens">
                {listaClientesDisplay}
            </div>
            <br/>
            <div className = "row d-flex justify-content-center align-items-end">
                <div className = "col-1">
                    <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={()=> setNumeroPagina(numeroPagina-1)}
                    disabled={numeroPagina<=0 ? true:false}> {"<"} </button>
                </div>
                <div className = "col-1 text-center">
                    <label>{numeroPagina}</label>
                </div>
                <div className = "col-1">
                    <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={()=> setNumeroPagina(numeroPagina+1)}
                    disabled={quantTotalRegistros/quantPagina>numeroPagina+1 ? false:true }>{">"}</button>
                </div>
            </div>

        </>
    );
}



const mapStateToProps = (state) => ({
    idCliente : state.Cliente.idCliente
  });
  
  const mapDispatchToProps = (dispatch) => ({
    setIdCliente: (idCliente) =>
      dispatch(ClienteAction.setIdCliente(idCliente)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TelaInicial);