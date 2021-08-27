export async function post(nome, referencia, idCliente){
    const obj = {
        NOME: tipo,
        REFERENCIA: referencia,
        ID_CLIENTE: idCliente
    }

    return await fetch("https://localhost:44369/RdSocial",{
        method:"POST",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        body:JSON.stringify(obj)
    })
    .then((response)=> response.json())
    .then((data) => data)


}

export async function put(id, nome, referencia, idCliente){
    const obj = {
        ID: id,
        NOME: nome,
        REFERENCIA: referencia,
        ID_CLIENTE: idCliente
    }

    return await fetch("https://localhost:44369/RdSocial/" + id,{
        method:"PUT",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        body:JSON.stringify(obj)
    })
    .then((response)=> response.json())
    .then((data) => data)

}
export async function GetAll(){
    return await fetch("https://localhost:44369/RdSocial",{
        method:"GET",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}
export async function GetById(id){
    return await fetch("https://localhost:44369/RdSocial/"+ id,{
        method:"GET",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}

export async function DeleteById(id){
    return await fetch("https://localhost:44369/RdSocial/"+ id,{
        method:"DELETE",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}
