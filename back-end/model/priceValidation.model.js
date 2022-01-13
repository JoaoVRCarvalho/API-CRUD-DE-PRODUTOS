function priceFormatter(price) {
    let formatedPrice = "";
    for (i in price) {
        if (price[i] === ",") formatedPrice += "."
        else formatedPrice += price[i]
    }
    return formatedPrice;
}

module.exports = priceFormatter;