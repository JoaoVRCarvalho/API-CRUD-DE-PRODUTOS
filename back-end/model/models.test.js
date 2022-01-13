const index = require('./exemplo.js');

// test('floatTeste', () => {
//     const result = index.numberFormater("299,52");
//     console.log(result)
// })

const lista = [{DESC_produto: "Gelo", PRICE_produto: 19, QTD_produto: "21"}, {DESC_produto: "Agua", PRICE_produto: 29, QTD_produto: "12"}]

test('priceFormatter', () => {
    result = index.priceFormatter(32.20);
    console.log(result);
})