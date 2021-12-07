const express = require('express')
require('dotenv').config()
const { ACCESS_TOKEN_U1 } = process.env
const app = express()


// SDK DE MERCADO PAGO
const mercadopago = require('mercadopago')
// Agrega credenciales
mercadopago.configure({
    access_token: ACCESS_TOKEN_U1
});

// routes
app.get('/checkout', (req, res) => { // creo que seria la ruta adonde me llevaria el boton de "pagar" para hace el checkout
    let preference = {
        items: [
            {
                title: 'Mi producto',
                unit_price: 500,
                quantity: 8,
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {


        }).catch(function (error) {
            console.log(error);
        });
})




// server

app.listen(3000, () => {
    console.log('server on port 3000')
})