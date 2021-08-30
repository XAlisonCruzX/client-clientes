export async function post(tipo, numero, idCliente){
    const obj = {
        TIPO: tipo,
        NUMERO: numero,
        ID_CLIENTE: idCliente,
    }

    return await fetch("https://localhost:44369/Telefone",{
        method:"POST",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        body:JSON.stringify(obj)
    })
    .then((response)=> response.json())
    .then((data) => data)


}

export async function put(id, tipo, numero, idCliente){
    const obj = {
        ID: id,
        TIPO: tipo,
        NUMERO: numero,
        ID_CLIENTE: idCliente,
    }

    return await fetch("https://localhost:44369/Telefone/" + id,{
        method:"PUT",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        body:JSON.stringify(obj)
    })
    .then((response)=> response.json())
    .then((data) => data)

}
export async function GetAll(){
    return await fetch("https://localhost:44369/Telefone",{
        method:"GET",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}
export async function GetById(id){
    return await fetch("https://localhost:44369/Telefone/"+ id,{
        method:"GET",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}

export async function DeleteById(id){
    return await fetch("https://localhost:44369/Telefone/"+ id,{
        method:"DELETE",
        mode: 'cors',
        headers:{"content-type": "application/json"},
        
    })
    .then((response)=> response.json())
    .then((data) => data)


}

export function FormataTelefone(nunero){
    nunero=nunero.replace(/\D/g,"");             //Remove tudo o que não é dígito
    nunero=nunero.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    nunero=nunero.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return nunero;
}