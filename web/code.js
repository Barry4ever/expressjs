// Imagina que esto es como la base de datos. Es un JSON con datos de los jugadores.
var data = {
    "messi": {
        id: "adsa87dsaf87",
        name: "messi",
        price: 32,
    },
    "ronaldo": {
        id: "09gf09jkeksds",
        name: "ronaldo",
        price: 30
    },
    "marquez": {
        id: "oy976ou09uoitroiy",
        name: "marquez",
        price: 0.0002
    },
    "dani": {
        id: "894389re98je98j",
        name: "dani",
        price: 178
    },
};
const fs = require('fs');
const solc = require('solc');



// Esta función se llama en el momento de pulsar el boton "pujar!"

function enviar_formulario(){
    // URL donde hacer la llamada:
    const url = "https://jsonplaceholder.typicode.com/posts";
    if (typeof web3 !== 'undefined'){
        web3 = new Web3 (web3.currentProvider);
    }else{
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
    }
    // recogemos el wallet del usuario que ejecuta la dapp, llamado owner
    web3.eth.defaultAccount = web3.eth.accounts[0];
    //
    var code = fs.readFileSync('../contracts/PaymentSplitter.sol').toString();
    compiledCode = solc.compile(code);
    var abiDefinition = JSON.parse(compiledCode.contracts[':PaymentSplitter'].interface);
    SplitterContract = web3.eth.contract(abiDefinition);
    var byteco = compiledCode.contracts[':PaymentSplitter'].bytecode;
   
    var puja = document.getElementById('puja').value;
    var vendedor = document.getElementById('idvendedor').value;
   
    deployedContract = SplitterContract.new(vendedor,puja,{from: web3.eth.defaultAccount, gas:7000000,data:byteco});

    

    




    //var abi =[{"constant":false,"inputs":[{"name": "account","type": "address"}],"name": "release_bussiness", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x0b8c54b2"},{"constant":true,"inputs":[],"name":"totalShares", "outputs": [{"name":"","type":"uint256"}], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x3a98ef39"     },     { "constant": false, "inputs": [   {     "name": "account",     "type": "address"   } ], "name": "release_vendor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x65c7a61c"     },     { "constant": true, "inputs": [   {     "name": "index",     "type": "uint256"   } ], "name": "payee", "outputs": [   {     "name": "",     "type": "address"   } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8b83209b"     },     { "constant": true, "inputs": [   {     "name": "account",     "type": "address"   } ], "name": "released", "outputs": [   {     "name": "",     "type": "uint256"   } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x9852595c"     },     { "constant": true, "inputs": [   {     "name": "account",     "type": "address"   } ], "name": "shares", "outputs": [   {     "name": "",     "type": "uint256"   } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xce7c2ac2"     },     { "constant": true, "inputs": [], "name": "totalReleased", "outputs": [   {     "name": "",     "type": "uint256"   } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xe33b7de3"     },     { "payable": true, "stateMutability": "payable", "type": "fallback"     },     { "anonymous": false, "inputs": [   {     "indexed": false,     "name": "from",     "type": "address"   },   {     "indexed": false,     "name": "amount",     "type": "uint256"   } ], "name": "PaymentReceived", "type": "event", "signature": "0x6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be770"     },     { "anonymous": false, "inputs": [   {     "indexed": false,     "name": "account",     "type": "address"   },   {     "indexed": false,     "name": "shares",     "type": "uint256"   } ], "name": "PayeeAdded", "type": "event", "signature": "0x40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac"     },     { "anonymous": false, "inputs": [   {     "indexed": false,     "name": "to",     "type": "address"   },   {     "indexed": false,     "name": "amount",     "type": "uint256"   } ], "name": "PaymentReleased", "type": "event", "signature": "0xdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056"     },     { "constant": false, "inputs": [   {     "name": "_to",     "type": "address"   } ], "name": "GetWalletSeller", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x0dcad955"     },     { "constant": false, "inputs": [   {     "name": "wallet_bussiness",     "type": "address"   } ], "name": "PaytoBussiness", "outputs": [   {     "name": "",     "type": "bool"   } ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x2210c219"}];
    //var Transaction = web3.eth.contract(abi);
    //  var Transaction = new web3.eth.Contract(abi,owner);
    
    //Transaction.methods.function().call().then(console.log)
    // Datos que se enviarian para relaizad la tansaccion:
    const datos_a_enviar = {
        body: {
            jugador_a_comprar: {},
            usuario_de_la_transaccion: {}
        },
        method: "POST"
    };

    // Variable donde se muestran los resultados:
    var resultado = document.getElementById('resultado');
    // Limpiar el campo resultado:
    resultado.innerText = "";

    // Variable del nombre del jugador seleccionado en la web:
    var player = document.querySelector('input[name="player"]:checked').value;

    // Cantidad introducida para la puja/compra del jugador seleccionado:
    var puja = document.getElementById('puja').value;
    var vendedor = document.getElementById('idvendedor').value;
    
    // Solo para mostrar en la consola los datos. Pulsa F12 en el navegador para ver el resultado.
    console.clear();
    console.log(data[player]);
    console.log(puja);
    console.log(vendedor);
    console.log("Owner "+ web3.eth.defaultAccount);
    console.log("Deployed address: " + deployedContract.address)
    console.log("address " + pago.eth.log);

   //console.log(web3.eth.defaultAccount +" ",vendedor+" ",puja+" ",byteco+" ",web3.eth.defaultAccount+" ",7000000);


    // Esta funcion hace una llamada a la URL indicada:
    fetch(url, datos_a_enviar)
        // Recogemos lo que devuelve la API y lo convertimos a JSON:
        .then( data => { return data.json() } )

        // "res" son los datos ya convertidos a JSON.
        .then( res => {
            // Mostramos el resultado en la web
            resultado.append(res.toSource());
        } );
}
