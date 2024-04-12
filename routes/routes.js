const authMW = require('../middware/login/authMW');
const passCheckMW = require('../middware/login/passCheckMW');
const renderMW = require('../middware/renderMW');
const getRecordsMW = require('../middware/records/getRecordsMW');
const getOrderMW = require('../middware/records/getOrderMW');
const getCustomerMW = require('../middware/records/getCustomerMW');
const saveCustomerMW = require('../middware/records/saveCustomerMW');
const saveOrderMW = require('../middware/records/saveOrderMW');
const delOrderMW = require('../middware/records/delOrderMW');
const getInventoryMW = require('../middware/inventory/getInventoryMW');
const getFlowerMW = require('../middware/inventory/getFlowerMW');
const saveFlowerMW = require('../middware/inventory/saveFlowerMW');
const delFlowerMW = require('../middware/inventory/delFlowerMW');

module.exports = function(app) {
    const objectRepository = {};
    // Login route
    app.use('/',
        authMW(objectRepository),
        passCheckMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    // Menu routes
    app.get('/menu',
        authMW(objectRepository),
        renderMW(objectRepository,'menu'));

    app.get('/menu/records',
        authMW(objectRepository),
        getRecordsMW(objectRepository),
        renderMW(objectRepository,'records'));

    app.use('/menu/records/:customerID',
        authMW(objectRepository),
        getOrderMW(objectRepository),
        getCustomerMW(objectRepository),
        saveCustomerMW(objectRepository),
        saveOrderMW(objectRepository),
        renderMW(objectRepository,'edit_order'));

    app.get('/menu/records/del/:customerID',
        authMW(objectRepository),
        getOrderMW(objectRepository),
        getCustomerMW(objectRepository),
        delOrderMW(objectRepository));

    app.use('/menu/records/new',
        authMW(objectRepository),
        saveOrderMW(objectRepository),
        saveCustomerMW(objectRepository),
        renderMW(objectRepository,'add_order'));

    // Customer info route
    app.get('/info/:customerID',
        authMW(objectRepository),
        getCustomerMW(objectRepository),
        renderMW(objectRepository,'customer_info'));

    // Inventory routes
    app.get('/menu/inventory',
        authMW(objectRepository),
        getInventoryMW(objectRepository),
        renderMW(objectRepository,'inventory'));

    app.use('/menu/inventory/:flowerID',
        authMW(objectRepository),
        getFlowerMW(objectRepository),
        saveFlowerMW(objectRepository),
        renderMW(objectRepository,'edit_flower'));

    app.get('/menu/inventory/del/:flowerID',
        authMW(objectRepository),
        getFlowerMW(objectRepository),
        delFlowerMW(objectRepository));

    app.use('/menu/inventory/new',
        authMW(objectRepository),
        saveFlowerMW(objectRepository),
        renderMW(objectRepository,'add_flower'));
};