function TabelaUtils(idTabela) {
    const tabela = document.getElementById(idTabela);

    function getTrFormatada(estudante) {
        return `<tr>
        <td>${estudante.nome}</td> 
        <td>${estudante.idade}</td> 
        <td>${estudante.documento}</td>
        <td>${estudante.matricula}</td>
        <td>${estudante.turma.nome}</td>
        <td>${estudante.turma.turno}</td>
        <td><button onclick='exibirDadosEdicao(${JSON.stringify(estudante)})'>Editar</button></td>
        <td><button onclick='excluir(${estudante.documento})'>Excluir</button></td>
        </tr>`;
    }

    return {
        adicionarLinha: function (estudante) {
            tabela.innerHTML += getTrFormatada(estudante);
        },
        adicionarLinhas: function (listaEstudantes) {
            for (let estudante = 0; estudante < listaEstudantes.length; estudante++) {
                this.adicionarLinha(listaEstudantes[estudante])
            }
        },
        limparTabela: function () {
            const linhas = tabela.rows

            for (let linha = 1; linha < linhas.length; linha++) {
                linhas[linha].innerHTML = ''
            }
        }
    }
}