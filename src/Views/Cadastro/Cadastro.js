
import { useState, useEffect} from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import ModalContato from '../ModalContato/ModalContato';
import ModalEndereco from '../ModalEndereco/ModalEndereco';
import ModalRdSocial from '../ModalRdSocial/ModalRdSocial';
import './Cadastro.css';
import * as ClienteUtils from '../../Utils/Cliente'

function Cadastro(props) {
  const [showModalContato, setShowModalContato] = useState(false);
  const [showModalEndereco, setShowModalEndereco] = useState(false);
  const [showModalRdSocial, setShowModalRdSocial] = useState(false);
  const[inputCod, setInputCod] = useState('');
  const[inputNome, setInputNome] = useState('');
  const[inputNascimento, setInputNascimento] = useState('');
  const[inputCpf, setInputCpf] = useState('');
  const[inputRg, setInputRg] = useState('');
  const historico = useHistory();
  
  useEffect(()=>{
    if(props.idCliente){
      GetById(props.idCliente)
    }
  },[props.idCliente]) 

async function GetById(id){
  var resposta = await ClienteUtils.GetById(id).then(data => data)
  if(resposta.status === 200){
      setInputCod(resposta.data.Cliente.ID);
      setInputNome(resposta.data.Cliente.NOME);
      setInputNascimento(resposta.data.Cliente.DATA_NASCIMENTO);
      setInputCpf(resposta.data.Cliente.CPF);
      setInputRg(resposta.data.Cliente.RG);

  }else{
      limparCampos();
  }

}

function limparCampos(){
      setInputCod('');
      setInputNome('');
      setInputNascimento('');
      setInputCpf('');
      setInputRg('');
}

 async function salvarCliente(){
      let resposta;
      if(inputCod){
        resposta = await ClienteUtils.putCliente(inputCod, inputNome, inputNascimento, inputCpf,inputRg).then((data) => data)
      }else{
        resposta = await ClienteUtils.postCliente(inputNome, inputNascimento, inputCpf,inputRg).then((data) =>  data)
      }
      if(resposta.status === 200){
        alert(resposta.message)
        setInputCod(resposta.data.Cliente.ID)
     }else{
       alert(resposta.message)
     }
  }

  async function deletarCliente(id){
    let resposta;
    if(inputCod){
      resposta = await ClienteUtils.DeleteById(id).then(data => data)
      alert(resposta.message)

      historico.push("/")
    }else{
      alert("Sem codigo")
    }
    limparCampos();
  }

  return (
      <>
        <form  id = "form-center">
            <div className = "form-group">
                <div className = "form-row">
                  <div className = "col-1">
                      <label>Codigo</label> 
                      <input 
                      type = "text" 
                      className = "form-control" 
                      disabled={true}
                      value={inputCod}/>
                  </div>
                  <div className="col-11 d-flex justify-content-end align-items-end">
                    <button type="button" className="btn btn-primary" onClick={() => limparCampos()}>Novo</button>  
                  </div>              
                </div>
            </div>
            <div className = "form-group">
                <div className = "form-row">
                  <div className = "col">
                      <label>Nome</label>
                      <input 
                      name = "nome"
                      type = "text" 
                      className = "form-control"
                      value={inputNome}
                      onChange = {(event) => setInputNome(event.target.value)}
                      />

                  </div>
                  <div className = "col-4">
                      <label>Nascimento</label>
                      <input 
                      type = "date" 
                      className = "form-control"
                      value={inputNascimento}
                      onChange={(event) => setInputNascimento(event.target.value)}
                      />

                  </div>
                </div>
            </div>
            <div className = "form-group">
                <div className = "form-row">
                  <div className = "col-6">
                      <label>CPF</label>
                      <input 
                      type = "text" 
                      className = "form-control"
                      value = {inputCpf}
                      onChange ={(event)=> setInputCpf(event.target.value)}
                      maxLength="11"/>

                  </div>
                  <div className = "col-6">
                      <label>RG</label>
                      <input type = "text" 
                      className = 
                      "form-control"
                      value = {inputRg}
                      onChange = {(event) => setInputRg(event.target.value)}
                      maxLength="12"/>

                  </div>
                </div>
            </div>

            <div className = "form-group">
                <div className = "form-row justify-content-end">
                  {inputCod && (
                    <div className = "col-1 d-flex justify-content-end">
                      <button type="button" className ="btn btn-danger" onClick={() => deletarCliente(inputCod)}>Excluir</button>
                    </div>
                    
                  )}
                  
                  <div className = "col-1 d-flex justify-content-end">
                      <button type="button" className ="btn btn-success" onClick={() => salvarCliente()}>Salvar</button>
                  </div>
                  
                </div>
            </div>


            <div className = "container-listas">
              <div className ="contato">
                  <div className = "d-flex justify-content-start">
                      <label>Contatos</label>
                  </div>
                  <div className = "lista-itens"></div>
                  <br/>
                  <div className = "row">
                    {inputCod && (
                    <div className ="col d-flex justify-content-end">
                      <button type = "button" className="btn btn-primary" onClick = {() => setShowModalContato(true)}>Adicionar</button>
                    </div>
                    )}
                    

                  </div>

              </div>
              <div className ="endereco">
                  <div className = "d-flex justify-content-start">
                      <label>Endereços</label>
                  </div>
                  <div className = "lista-itens"></div>
                  <br/>
                  <div className = "row">
                    {inputCod && (
                      <div className ="col d-flex justify-content-end">
                        <button type = "button" className="btn btn-primary" onClick = {() => setShowModalEndereco(true)}>Adicionar</button>
                      </div>
                    )}

                  </div>

              </div>

              
              <div className ="redesocial">
                <div className = "d-flex justify-content-start">
                    <label>Redes Sociais</label>
                </div>
                
                <div className = "lista-itens">
                   
                    <div className = "teste"></div>
                    <div className = "teste"></div>
                    <div className = "teste"></div>
                  </div>
                  <br/>
                  <div className = "row">
                    {inputCod && (
                      <div className ="col d-flex justify-content-end">
                        <button type = "button" className="btn btn-primary" onClick={()=>setShowModalRdSocial(true)}>Adicionar</button>
                      </div>
                    )}

                  </div>
              </div>
            </div>
            

        </form>

        <ModalContato show ={showModalContato} handleClose = {()=>setShowModalContato(false)}/>
        <ModalEndereco show ={showModalEndereco} handleClose = {()=>setShowModalEndereco(false)}/>
        <ModalRdSocial show ={showModalRdSocial} handleClose = {()=>setShowModalRdSocial(false)}/>

      </>

  );
}

const mapStateToProps = (state) => ({
  idCliente : state.Cliente.idCliente
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);