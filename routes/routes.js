const authMW = require('../middleware/login/authMW');
const passCheckMW = require('../middleware/login/passCheckMW');
const registerMW = require('../middleware/login/registerMW')
const logoutMW = require('../middleware/login/logoutMW');
const renderMW = require('../middleware/renderMW');
const getRecordsMW = require('../middleware/records/getRecordsMW');
const getOrderMW = require('../middleware/records/getOrderMW');
const saveOrderMW = require('../middleware/records/saveOrderMW');
const delOrderMW = require('../middleware/records/delOrderMW');
const getInventoryMW = require('../middleware/inventory/getInventoryMW');
const getFlowerMW = require('../middleware/inventory/getFlowerMW');
const saveFlowerMW = require('../middleware/inventory/saveFlowerMW');
const delFlowerMW = require('../middleware/inventory/delFlowerMW');

//modellek betoltese
const OrderModel = require('../models/order')
const FlowerModel = require('../models/flower')
const UserModel = require('../models/user');

module.exports = function(app) {
    const objectRepository = {
        OrderModel: OrderModel,
        FlowerModel: FlowerModel,
        UserModel: UserModel
    };

    // Menu routes
    app.get('/menu',
        authMW(objectRepository),
        renderMW(objectRepository,'menu'));


    //Delete routes

    app.get('/menu/records/del/:order_id',
        authMW(objectRepository),
        getOrderMW(objectRepository),
        delOrderMW(objectRepository));

    app.get('/menu/inventory/del/:flower_id',
        authMW(objectRepository),
        getFlowerMW(objectRepository),
        delFlowerMW(objectRepository));

    // Records routes
    app.use('/menu/records/new',
        authMW(objectRepository),
        getInventoryMW(objectRepository),
        saveOrderMW(objectRepository),
        renderMW(objectRepository,'add_order'));

    app.use('/menu/records/edit/:order_id',
        authMW(objectRepository),
        getOrderMW(objectRepository),
        getInventoryMW(objectRepository),
        saveOrderMW(objectRepository),
        renderMW(objectRepository,'add_order'));

    app.get('/menu/records',
        authMW(objectRepository),
        getRecordsMW(objectRepository),
        renderMW(objectRepository,'records'));

    // Customer info route
    app.get('/info/:order_id',
        authMW(objectRepository),
        getOrderMW(objectRepository),
        renderMW(objectRepository,'customer_info'));

    // Inventory routes



    app.get('/menu/inventory',
        authMW(objectRepository),
        getInventoryMW(objectRepository),
        renderMW(objectRepository,'inventory'));

    app.use('/menu/inventory/new',
        authMW(objectRepository),
        saveFlowerMW(objectRepository),
        renderMW(objectRepository,'add_flower'));

    app.use('/menu/inventory/edit/:flower_id',
        authMW(objectRepository),
        getFlowerMW(objectRepository),
        saveFlowerMW(objectRepository),
        renderMW(objectRepository,'add_flower'));


    //Logout route
    app.use('/logout',
        logoutMW(objectRepository)
    );

    //registration route
    app.use('/register',
        registerMW(objectRepository),
    );

    // Login route
    app.use('/',
        passCheckMW(objectRepository),
        renderMW(objectRepository, 'login')
    );
};
