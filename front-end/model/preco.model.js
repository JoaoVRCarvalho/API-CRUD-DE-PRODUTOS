function priceFormatter(price) {
    let stringedPrice = price.toString()
    let newPrice = ""
    for (i in stringedPrice) {
        if (stringedPrice[i] === ".") newPrice += ","
        else newPrice += stringedPrice[i]
    }
    return newPrice
}