const printReceipt = require('../main');

it ('should return error msg when receipt id is invalid', () => {
    expect(printReceipt([])).toBe('ERROR Invalid codes');
});

it ('should return error msg when receipt id is invalid', () => {
    expect(printReceipt(['ERROR'])).toBe('ERROR Invalid codes');
});

it ('should return receipt summary info when id is valid', () => {
    expect(printReceipt(['0001'])).toBe('Receipts\n'+
    '------------------------------------------------------------\n'+
    'Coca Cola\t\t3\t\t1\n'+
    '------------------------------------------------------------\n'+
    'Price: 3');
});

it ('should return multi-lines receipt summary info when ids are valid', () => {
    expect(printReceipt(['0001', '0003', '0005', '0003'])).toBe('Receipts\n'+
    '------------------------------------------------------------\n'+
    'Coca Cola\t\t3\t\t1\n'+
    'Pepsi-Cola\t\t5\t\t2\n'+
    'Dr Pepper\t\t7\t\t1\n'+
    '------------------------------------------------------------\n'+
    'Price: 20');
});
