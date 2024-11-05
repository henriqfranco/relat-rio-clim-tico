import { currentDate, nameCidade, nameEstado, salvarPDF, weather } from "./script.js";

window.addEventListener('load', nameEstado(), currentDate());

const selectEst = document.querySelector('#est');
const selectCid = document.querySelector('#cid');
const salvarButton = document.getElementById('salvar');

selectEst.addEventListener('change', (event) => {
    if(event.target.value !== 'none'){
        nameCidade(event.target.value);
        document.getElementById('inpCid').classList.remove('hidden');
        const paragrafoEstado = document.getElementById('siglaEstadoColetado');
        paragrafoEstado.innerText = event.target.value;
    }
    else{
        document.getElementById('inpCid').classList.add('hidden');
        document.querySelector('.qualidade').classList.add('hidden');
        document.querySelector('.divisoria').classList.add('hidden');
        document.querySelector('.periodoColeta').classList.add('hidden');
        document.querySelector('table').classList.add('hidden');
        document.getElementById('salvar').classList.add('hidden');
    }
});

selectCid.addEventListener('change', (event) => {
    if(event.target.value !== 'none'){
        weather(event.target.value);
        document.querySelector('.qualidade').classList.remove('hidden');
        const paragrafoCidade = document.getElementById('cidadeColetada');
        paragrafoCidade.innerText = event.target.value;
        document.querySelector('.divisoria').classList.remove('hidden');
        document.querySelector('.periodoColeta').classList.remove('hidden');
        document.querySelector('table').classList.remove('hidden');
        document.getElementById('salvar').classList.remove('hidden');
    }
    else{
        document.querySelector('.qualidade').classList.add('hidden');
        document.querySelector('.divisoria').classList.add('hidden');
        document.querySelector('.periodoColeta').classList.add('hidden');
        document.querySelector('table').classList.add('hidden');
        document.getElementById('salvar').classList.add('hidden');
    }
})

const elementoSalvar = document.querySelector('body');
salvarButton.addEventListener('click', () => {
    salvarPDF(elementoSalvar, 'relatório_climático')
});