class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {

        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null || this.dia > 31) {
                return false
            }
        }

        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(despesa) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(despesa))

        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

const cadastrarDespesa = () => {
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value)
    

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        //modal success
        document.getElementById('modalTituloDiv').className = 'modal-header text-success'
        document.getElementById('modalTitulo').innerHTML = 'Sucesso gravação'
        document.getElementById('descricaoModal').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('botaoModal').className = 'btn btn-success'
        document.getElementById('botaoModal').innerText = 'Voltar'

        $('#modalResposta').modal('show')
    } else {
        //modal erro
        document.getElementById('modalTituloDiv').className = 'modal-header text-danger'
        document.getElementById('modalTitulo').innerHTML = 'Erro gravação'
        document.getElementById('descricaoModal').innerHTML = 'Erro na gravação, verifique se todos os campos estão preenchidos!'
        document.getElementById('botaoModal').className = 'btn btn-danger'
        document.getElementById('botaoModal').innerText = 'Voltar e Corrigir'
        
        $('#modalResposta').modal('show')
    }
}




//Eventos
document.getElementById('cadastrar')
    .addEventListener('click', cadastrarDespesa)