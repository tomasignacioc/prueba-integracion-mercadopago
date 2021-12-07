const express = require('express')
require('dotenv').config()
const { ACCESS_TOKEN_U1 } = process.env
const app = express()
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser')

// body parser
app.use(bodyParser.urlencoded({ extended: false }))

// SDK DE MERCADO PAGO
const mercadopago = require('mercadopago')
// Agrega credenciales
mercadopago.configure({
    access_token: ACCESS_TOKEN_U1
});

// routes
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/checkout', (req, res) => { // creo que seria la ruta adonde me llevaria el boton de "pagar" para hace el checkout
    console.log(req.body)
    let preference = {
        items: [
            {
                title: req.body.title,
                unit_price: parseInt(req.body.price),
                quantity: parseInt(req.body.quantity),
            }
        ]
    };
    //              preference seria la compra
    mercadopago.preferences.create(preference)
        .then(function (response) {
            // poner las credenciales de produccion !! (propiedad "init_point")
            res.redirect(response.body.init_point)

        }).catch(function (error) {
            console.log(error);
        });
})




// server
app.use('/', router);
app.listen(3000, () => {
    console.log('server on port 3000')
})