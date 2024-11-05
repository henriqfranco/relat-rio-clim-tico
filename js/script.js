export async function nameEstado() {
    try {
        const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        if (!res.ok) {
            throw new Error('Erro ao fazer o fetch na API.');
        }
        const dados = await res.json();
        const selectEst = document.getElementById('est');

        dados.forEach(estado => {
            selectEst.innerHTML += `<option value="${estado.sigla}">${estado.nome}</option>`
        });
    } catch (error) {
        console.error(error);
    }
};

export async function nameCidade(siglaEstado) {
    try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`);
        if (!res.ok) {
            throw new Error('Erro ao fazer o fetch na API.');
        }
        const dados = await res.json();
        const selectCid = document.getElementById('cid');
        selectCid.innerHTML = '';
        selectCid.innerHTML = '<option value="none">SELECIONE UMA CIDADE</option>';

        dados.forEach(cidade => {
            selectCid.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`;
        });
    } catch (error) {
        console.error(error);
    }
};

export function currentDate() {
    try {
        const date = new Date();
        const formatDate = (date).toLocaleDateString("pt-BR");
        const formatTime = (date).toLocaleTimeString('pt-br');

        const dataInput = document.getElementById('data');
        const paragrafoData = document.getElementById('dataAtual');
        const paragrafoHora = document.getElementById('horaAtual');

        dataInput.value = formatDate;
        paragrafoData.innerText = formatDate;
        paragrafoHora.innerText = formatTime.slice(0, 5);

    } catch (error) {
        console.error('Erro ao definir a data:', error);
    }
}

export async function weather(cidade) {
    const key = '541e27c321d14301a45175908240411';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cidade}&days=1&aqi=yes&alerts=yes&lang=pt`;
    const res = await fetch(url);
    const dados = await res.json();

    const airQualityElements = {
        co: document.getElementById('co'),
        no2: document.getElementById('no2'),
        o3: document.getElementById('o3'),
        pm2_5: document.getElementById('pm2'),
        pm10: document.getElementById('pm10'),
        so2: document.getElementById('so2')
    };

    const qualAr = document.getElementById('qualAr');
    const indexDefra = dados.current.air_quality["gb-defra-index"];

    if (indexDefra >= 1 && indexDefra <= 3) {
        qualAr.innerText = 'Boa';
        qualAr.style.backgroundColor = 'rgb(63, 255, 63)';
    }
    else if (indexDefra >= 4 && indexDefra <= 6) {
        qualAr.innerText = 'Moderada';
        qualAr.style.backgroundColor = 'rgb(255, 191, 72)';
    }
    else if (indexDefra >= 7 && indexDefra <= 9) {
        qualAr.innerText = 'Ruim';
        qualAr.style.backgroundColor = 'rgb(255, 72, 72)';
    }
    else {
        qualAr.innerText = 'Horrível';
        qualAr.style.backgroundColor = 'rgb(177, 37, 177)';
    }

    const airQualityData = dados.current.air_quality;

    Object.entries(airQualityElements).forEach(([key, element]) => {
        if (airQualityData[key] !== undefined) {
            element.innerText = airQualityData[key];
        } else {
            element.innerText = 'N/A';
        }
    });

    const table = document.querySelector('tbody');
    table.innerHTML = ''
    dados.forecast.forecastday[0].hour.forEach(hora => {
        const tr = document.createElement('tr');

        const trInfo = `<td>${hora.time.slice(11, 16)}</td>
        <td>${hora.condition.text}</td>
        <td>${hora.chance_of_rain}</td>
        <td>${hora.temp_c}</td>
        <td>${hora.feelslike_c}</td>
        <td>${hora.humidity}</td>
        <td>${hora.wind_kph}</td>`

        tr.innerHTML = trInfo;
        table.appendChild(tr)
    })
}

export async function salvarPDF(elemento, filename) {
    const options = {
        margin: [15, 10, 12, 10],
        filename: filename + ".pdf",
        image: { type: 'png', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'landscape',
        }
    }
    html2pdf().set(options).from(elemento).save()
}