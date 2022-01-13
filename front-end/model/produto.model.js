function produtosModel(listaItens) {
    let listaOBJ = [];
    for (i in listaItens) {
        let obj = {
            id: listaItens[i].ID_produto,
            nome: listaItens[i].DESC_produto,
            preco: listaItens[i].PRICE_produto.toFixed(2),
            qtd: listaItens[i].QTD_produto
        }
        listaOBJ.push(obj);
    }
    return listaOBJ;
}