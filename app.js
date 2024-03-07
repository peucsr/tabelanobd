let dados = [
    { status: "Aprovado", nome: "Nome1", pontuacao: 0 },
    { status: "Aprovado", nome: "Nome2", pontuacao: 0 },
    { status: "Aprovado", nome: "Nome3", pontuacao: 0 },
    { status: "Aprovado", nome: "Nome4", pontuacao: 0 },
    { status: "Aprovado", nome: "Nome5", pontuacao: 0 },
    { status: "Aprovado", nome: "Nome6", pontuacao: 0 },
    { status: "Aprovado", nome: "Nome7", pontuacao: 0 }
  ];

  let edicaoIndex = null;

  function preencherTabela() {
    // Ordenar dados por pontuação em ordem decrescente, mantendo a ordem original pela posição
    const dadosOrdenados = [...dados].sort((a, b) => {
      if (a.pontuacao === b.pontuacao) {
        return a.status - b.status;
      }
      return b.pontuacao - a.pontuacao;
    });

    const tabelaBody = document.querySelector("#tabela tbody");
    tabelaBody.innerHTML = "";

    dadosOrdenados.forEach((item, index) => {
      const row = tabelaBody.insertRow();
      const checkboxCell = row.insertCell(0);
      checkboxCell.innerHTML = `<input type="checkbox" onchange="selecionarLinha(this)">`;
      row.insertCell(1).textContent = item.status;
      row.insertCell(2).textContent = item.nome;
      row.insertCell(3).textContent = item.pontuacao;

      const acoesCell = row.insertCell(4);
      const editarButton = document.createElement("button");
      editarButton.textContent = "Editar";
      editarButton.onclick = () => iniciarEdicao(index);
      acoesCell.appendChild(editarButton);
    });
  }

  function adicionarDados() {
    const nome = document.getElementById("nome").value;
    const pontuacao = document.getElementById("pontuacao").value;

    if (nome && pontuacao) {
      if (edicaoIndex !== null) {
        // Editar dados existentes
        dados[edicaoIndex].nome = nome;
        dados[edicaoIndex].pontuacao = pontuacao;
        edicaoIndex = null;
      } else {
        // Adicionar novos dados
        const novastatus = dados.length + 1;
        const novoItem = { status: novastatus, nome: nome, pontuacao: pontuacao };
        dados.push(novoItem);
      }

      preencherTabela();
      limparFormulario();
    }
  }

  function ordenarPor(campo) {
    dados.sort((a, b) => (a[campo] > b[campo] ? 1 : -1));
    preencherTabela();
  }

  function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("pontuacao").value = "";
  }

  function selecionarTodasLinhas(checkbox) {
    const checkboxes = document.querySelectorAll("#tabela tbody input[type=checkbox]");
    checkboxes.forEach((cb) => (cb.checked = checkbox.checked));
  }

  function selecionarLinha(checkbox) {
    const todasSelecionadas = Array.from(document.querySelectorAll("#tabela tbody input[type=checkbox]")).every(
      (cb) => cb.checked
    );
    document.getElementById("selecionarTudo").checked = todasSelecionadas;
  }

  function removerSelecionados() {
    dados = dados.filter((item, index) => {
      const checkbox = document.querySelector(`#tabela tbody tr:nth-child(${index + 1}) input[type=checkbox]`);
      return !checkbox.checked;
    });
    preencherTabela();
  }

  function iniciarEdicao(index) {
    edicaoIndex = index;
    const nomeInput = document.getElementById("nome");
    const pontuacaoInput = document.getElementById("pontuacao");

    nomeInput.value = dados[index].nome;
    pontuacaoInput.value = dados[index].pontuacao;
  }

  preencherTabela();