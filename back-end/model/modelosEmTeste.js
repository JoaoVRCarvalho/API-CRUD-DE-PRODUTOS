function aplicarDesconto(valor, desconto){
    if(desconto > valor) return 0;
    return valor - desconto;
}

function numberFormater(numero) {
    let formatedNumber = "";
    for (i in numero) {
        if (numero[i] === ",") formatedNumber += "."
        else formatedNumber += numero[i]
    }
    return formatedNumber;
}

function priceFormatter(price) {
    let testVariable = price.toString()
    let test;
    let newPrice = ""
    for (i in testVariable) {
        test = testVariable[0]
        newPrice += testVariable[i]
        // if (price[i] === ".") newPrice = ","
        // else newPrice = price[i]
    }
    return {
        test,
        newPrice,
        testVariable
    };
}

module.exports = { aplicarDesconto, numberFormater, priceFormatter }