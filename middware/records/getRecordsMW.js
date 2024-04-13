/**
 * Get the data of records, put it into the table
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.records = [
            {
                customerID: '1',
                cust_name: 'John Doe',
                flower_name: 'Roses',
                amount: '10',
                price: '$100'
            },
            {
                customerID: '2',
                cust_name: 'Alice Smith',
                flower_name: 'Tulips',
                amount: '20',
                price: '$150'
            },
            {
                customerID: '3',
                cust_name: 'Bob Johnson',
                flower_name: 'Daisies',
                amount: '15',
                price: '$120'
            },
            {
                customerID: '4',
                cust_name: 'Emily Brown',
                flower_name: 'Lilies',
                amount: '12',
                price: '$90'
            },
            {
                customerID: '5',
                cust_name: 'Michael Wilson',
                flower_name: 'Sunflowers',
                amount: '25',
                price: '$180'
            },
            {
                customerID: '6',
                cust_name: 'Sophia Garcia',
                flower_name: 'Orchids',
                amount: '8',
                price: '$200'
            }
        ];
        return next();
    };
};
