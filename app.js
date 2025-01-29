let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMaximo = 0;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if(isNaN(numeroDeUsuario) ){
        asignarTextoElemento('p','tienes que ingresar un número');
        return;
    }

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`🎉🎉Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.querySelector('#intentar').setAttribute('disabled','true');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        intentosMaximo--;
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p',`número de intentos: ${intentosMaximo} <br>El número secreto es menor`);
        } else {
            asignarTextoElemento('p',`número de intentos: ${intentosMaximo} <br>El número secreto es mayor`);
        }
        intentos++;
        limpiarCaja();
        if(intentosMaximo == 0){
            asignarTextoElemento('p',`😥😥número de intentos: ${intentosMaximo}`);
            document.querySelector('#intentar').setAttribute('disabled','true');
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
    }
    
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    /*console.log(numeroGenerado);
    console.log(listaNumerosSorteados);*/
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    intentosMaximo = 3;
    asignarTextoElemento('p',`número de intentos: ${intentosMaximo} <br>Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    document.querySelector('#intentar').removeAttribute('disabled');
    
}

condicionesIniciales();
