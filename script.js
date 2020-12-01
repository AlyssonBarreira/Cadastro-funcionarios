class Cadastro {
    constructor() {
        this.cadastros = localStorage.getItem("tbCadastros") === null ? [] : JSON.parse(localStorage.getItem("tbCadastros"))
    }

    salva(cadastro) {
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(cadastro.codigo) 
        }
        this.cadastros.push(cadastro)
        localStorage.setItem("tbCadastros", JSON.stringify(this.cadastros))
        alert('Cadastro efetuado!')
        this.limpa()
        return true
    }
    
    apaga(codigo) { 
        let index = this.cadastros.findIndex(cadastro => cadastro.codigo == codigo)      
        this.cadastros.splice(index, 1) 
        localStorage.setItem("tbCadastros", JSON.stringify(this.cadastros))
        cadastro.atualiza() 
     }
 
     limpa(){
         document.getElementById('codigo').value = ''
         document.getElementById('nome').value = ''
         document.getElementById('ctps').value = ''
         document.getElementById('rg').value = ''
         document.getElementById('mail').value = ''
         document.getElementById('celular').value = ''
         document.getElementById('admissao').value = ''
         document.getElementById('cargo').value = ''
     }
 
     edita(cadastro){
         document.getElementById('codigo').setAttribute('disabled', 'disabled')
         document.getElementById('codigo').value = cadastro.codigo
         document.getElementById('nome').value = cadastro.nome
         document.getElementById('ctps').value = cadastro.ctps
         document.getElementById('rg').value = cadastro.rg
         document.getElementById('mail').value = cadastro.email
         document.getElementById('celular').value = cadastro.celular
         document.getElementById('admissao').value = cadastro.admissao
         document.getElementById('cargo').value = cadastro.cargo
 
     }

    listar() {
        const cadastrados = this.cadastros.map((cadastro) => (
            `<tr>
                <td>${cadastro.codigo}</td>
                <td>${cadastro.nome}</td>
                <td>${cadastro.ctps}</td>
                <td>${cadastro.admissao}</td>
                <td>${cadastro.cargo}</td>
                <td><button id='apagar' onClick='cadastro.apaga(${cadastro.codigo})'>Apagar</button>
                    <button id='editar' onClick='cadastro.edita(${JSON.stringify(cadastro)})'>Editar</button>
                </td>    
            </tr>`
        ))
        return (`
        <table border='1' class='table'>
         <caption>Cadastrados</caption>
            <thead>
                <th>Codigo</th>
                <th>Nome</th>
                <th>CTPS</th>
                <th>Data de Admissão</th>
                <th>Cargo</th>
                <th>Opções</th>
            </thead>
            <tbody>
            ${cadastrados}
            </tbody>
        </table>`
        )
    }

    atualiza(){     
        document.getElementById('funcionarios').innerHTML = cadastro.listar()
    }

}

const cadastro = new Cadastro()

document.getElementById('salvar').onclick = function () {
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        ctps: document.getElementById('ctps').value,
        rg: document.getElementById('rg').value,
        email: document.getElementById('mail').value,
        celular: document.getElementById('celular').value,
        admissao: document.getElementById('admissao').value,
        cargo: document.getElementById('celular').value
    }
    cadastro.salva(registro)

}

window.onload = function() {
    cadastro.atualiza()   
}