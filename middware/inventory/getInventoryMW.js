/**
 * get the list of information of all flowers, inventory
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.inventory = [
            {
                flowerID: '1',
                flower_name: 'Dahlias',
                flower_amount: '10',
                flower_price: '$5.00'
            },
            {
                flowerID: '2',
                flower_name: 'Daisies',
                flower_amount: '8',
                flower_price: '$3.50'
            },
            {
                flowerID: '3',
                flower_name: 'Mums',
                flower_amount: '18',
                flower_price: '$5.50'
            },
            {
                flowerID: '4',
                flower_name: 'Feverfew',
                flower_amount: '15',
                flower_price: '$4.25'
            },
            {
                flowerID: '5',
                flower_name: 'Hyacinth',
                flower_amount: '20',
                flower_price: '$6.00'
            },
            {
                flowerID: '6',
                flower_name: 'Lilies',
                flower_amount: '12',
                flower_price: '$4.75'
            },
            {
                flowerID: '7',
                flower_name: 'Orchid',
                flower_amount: '22',
                flower_price: '$7.00'
            },
            {
                flowerID: '8',
                flower_name: 'Peony',
                flower_amount: '9',
                flower_price: '$6.25'
            }
        ];
        return next();
    };
};
