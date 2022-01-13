const updateForm = document.getElementById("UPDATE-FORM");

window.onload = async () => {
  const listaProdutos = JSON.parse(await createRequest("GET", "http://localhost:8080/api/produtos"))
  const allItens = produtosModel(listaProdutos);
  console.log(allItens);
  const itens = document.querySelector('#itens')

  allItens.forEach(produto => {
    itens.insertAdjacentHTML('beforeend', `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${produto.nome}</h5>
      <div class="subtitle">
        <h6 class="card-subtitle mb-2 text-muted">R$ ${priceFormatter(produto.preco)}</h6>
        <h6 id="qtdCardHeader${produto.id}" class="card-subtitle mb-2 text-muted">Qtd ${produto.qtd}</h6>
      </div>
      
      <div class="subtitle">
        <form id="VENDER-PRODUTO" method="post" enctype="application/json">
          <input type="hidden" id="quantidadeInput" name="quantidade">
          <button type="submit" id="venderBtn${produto.id}" form="VENDER-PRODUTO" class="btn btn-primary">Vender</button>
        </form>
        <button type="button" id="editButton${produto.id}" class="btn btn-secondary" data-toggle="modal" data-target="#editModal")>Editar</button>
        <form id="REMOVER-PRODUTO" method="get" enctype="application/json">
          <button type="submit" id="removeBtn${produto.id}" form="REMOVER-PRODUTO" class="btn btn-secondary">Remover</button>
        </form>
      </div>
    </div>
  </div>`)

  const obj = allItens.find(item => item.id === produto.id)
  // const headerQtdCard = document.getElementById(`qtdCardHeader${obj.id}`)
  const venderForm = document.getElementById("VENDER-PRODUTO")
  const venderBtn = document.getElementById(`venderBtn${obj.id}`)
  const removeForm = document.getElementById("REMOVER-PRODUTO")
  const removeBtn = document.getElementById(`removeBtn${obj.id}`)
  let editBtn = document.getElementById (`editButton${obj.id}`)

  if (obj.qtd == "Esgotado") {
    venderBtn.disabled = true;
    venderForm.action = "http://localhost:8080/produtos"
  }

  venderBtn.addEventListener("click", () => {
    if (obj.qtd != "Esgotado") {
      let qtdInNumber = Number(obj.qtd)
      venderForm.quantidade.value = qtdInNumber - 1
      if (venderForm.quantidade.value < 0) {
        venderBtn.disabled = true;
        venderForm.action = "http://localhost:8080/produtos"
      }
      else {
        venderForm.action = `http://localhost:8080/api/produtos/updateprice/${obj.id}`
      }
   } else venderBtn.disabled = true
  }, false)

  editBtn.addEventListener("click", () => {
    updateForm.action = `http://localhost:8080/api/produtos/update/${obj.id}`
    document.getElementById("editModalLabel").innerText = `Editar ${obj.nome}`
    updateForm.preco.value = obj.preco;
    updateForm.quantidade.value = obj.qtd;
  }, false)

  removeBtn.addEventListener("click", () => {
    removeForm.action = `http://localhost:8080/api/delete/${obj.id}`
  }, false)

  })
}