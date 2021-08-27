export async function post(tipo,cep,rua, numero, idCliente){
    const obj = {
        TIPO: tipo,
        CEP:cep,
        RUA:rua,
        NUMERO: numero,
        ID_CLIENTE: idCliente,
    }

    return await fetch("https://localhost:44369/Endereco",{
        method:"POST",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        body:JSON.stringify(obj)
    })
    .then((response)=> response.json())
    .then((data) => data)


}

export async function put(id, tipo,cep,rua, numero, idCliente){
    const obj = {
        ID: id,
        TIPO: tipo,
        CEP:cep,
        RUA:rua,
        NUMERO: numero,
        ID_CLIENTE: idCliente,
    }

    return await fetch("https://localhost:44369/Endereco/" + id,{
        method:"PUT",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        body:JSON.stringify(obj)
    })
    .then((response)=> response.json())
    .then((data) => data)

}
export async function GetAll(){
    return await fetch("https://localhost:44369/Endereco",{
        method:"GET",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}
export async function GetById(id){
    return await fetch("https://localhost:44369/Endereco/"+ id,{
        method:"GET",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}

export async function DeleteById(id){
    return await fetch("https://localhost:44369/Endereco/"+ id,{
        method:"DELETE",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}
