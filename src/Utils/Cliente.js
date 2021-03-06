export async function postCliente(nome, nascimento, cpf, rg) {
    const obj = {
        NOME: nome,
        DATA_NASCIMENTO: nascimento,
        CPF: cpf,
        RG: rg
    }

    return await fetch("https://localhost:44369/Cliente", {
        method: "POST",
        mode: 'cors',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((response) => response.json())
        .then((data) => data)


}

export async function putCliente(id, nome, nascimento, cpf, rg) {
    const obj = {
        ID: id,
        NOME: nome,
        DATA_NASCIMENTO: nascimento,
        CPF: cpf,
        RG: rg
    }

    return await fetch("https://localhost:44369/Cliente/" + id, {
        method: "PUT",
        mode: 'cors',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((response) => response.json())
        .then((data) => data)

}
export async function GetClientePag(pag, quant, nome) {
    const obj = {
        PAG: pag,
        QUANT: quant,
        NOME: nome
    }

    return await fetch("https://localhost:44369/Cliente/Paginado", {
        method: "POST",
        mode: 'cors',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((response) => response.json())
        .then((data) => data)


}
export async function GetAll() {
    return await fetch("https://localhost:44369/Cliente", {
        method: "GET",
        mode: 'cors',
        headers: { "content-type": "application/json" },

    })
        .then((response) => response.json())
        .then((data) => data)


}
export async function GetById(id) {
    return await fetch("https://localhost:44369/Cliente/" + id, {
        method: "GET",
        mode: 'cors',
        headers: { "content-type": "application/json" },

    })
        .then((response) => response.json())
        .then((data) => data)


}

export async function DeleteById(id) {
    return await fetch("https://localhost:44369/Cliente/" + id, {
        method: "DELETE",
        mode: 'cors',
        headers: { "content-type": "application/json" },

    })
        .then((response) => response.json())
        .then((data) => data)


}

export function FormataRg(rg) {
    rg = rg.replace(/\D/g, "");
    rg = rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
    return rg;
}

export function FormataCPF(cpf) {

    cpf = cpf.replace(/[^\d]/g, ""); //retira os caracteres indesejados...

    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); //realizar a formata????o...
}