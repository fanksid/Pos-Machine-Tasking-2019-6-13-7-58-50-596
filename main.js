function printReceipt(productIdArray) {

    if (!(productIdArray instanceof Array) || productIdArray.length == 0) {
        return "ERROR Invalid codes"
    }

    var productArray = findProductInfo(productIdArray)

    if ((productArray instanceof Array) && productArray.length == 0) {
        return "ERROR Invalid codes"
    }

    var receiptSum = receiptSumm(productArray)

    return printReceiptSummary(receiptSum);
}

function printReceiptSummary(receiptSum) {
    return receiptSum.name + '\n' +
        '------------------------------------------------------------\n' +
        printReceiptDetail(receiptSum) +
        '------------------------------------------------------------\n' +
        'Price: ' + receiptSum.price;
}

function printReceiptDetail(receiptSum) {
    var result = '';
    receiptSum.productList.forEach(r => {
        result = result + r.name + '\t\t' + r.price + '\t\t' + r.size + '\n';
    });
    return result;
}

function receiptSumm(productArray) {
    var sumMap = groupProductArray(productArray)

    return getReceiptSummary(sumMap)
}

function getReceiptSummary(map) {
    var receiptSum = {
        name: 'Receipts',
        productList: [],
        price: 0
    };

    map.forEach(function (value, key, map) {
        var receipt = {
            name: value[0].name,
            price: value[0].price,
            size: value.length
        }
        receiptSum.productList.push(receipt);
        receiptSum.price = receiptSum.price + receipt.price * receipt.size;
    })

    return receiptSum;
}

function groupProductArray(productArray) {
    var groupMap = new Map();
    productArray.forEach(element => {
        if (groupMap.has(element.id)) {
            groupMap.get(element.id).push(element)
        } else {
            groupMap.set(element.id, [element]);
        }
    });

    return groupMap;
}

function findProductInfo(ids) {
    var list = loadAllItems();

    var result = [];
    ids.forEach(id => {
        const product = findProduct(list, id);
        if (product != null) {
            result.push(product);
        }
    });

    return result;
}

function loadAllItems() {
    return [
        { "id": "0001", "name": "Coca Cola", "price": 3 },
        { "id": "0002", "name": "Diet Coke", "price": 4 },
        { "id": "0003", "name": "Pepsi-Cola", "price": 5 },
        { "id": "0004", "name": "Mountain Dew", "price": 6 },
        { "id": "0005", "name": "Dr Pepper", "price": 7 },
        { "id": "0006", "name": "Sprite", "price": 8 },
        { "id": "0007", "name": "Diet Pepsi", "price": 9 },
        { "id": "0008", "name": "Diet Mountain Dew", "price": 10 },
        { "id": "0009", "name": "Diet Dr Pepper", "price": 11 },
        { "id": "0010", "name": "Fanta", "price": 12 }
    ];
}

function findProduct(list, id) {
    for (let index = 0; index < list.length; index++) {
        if (list[index].id == id) {
            return list[index];
        }
    }
    return null;
}


module.exports = printReceipt;
