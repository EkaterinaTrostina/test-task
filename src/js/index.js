"use strict"

document.addEventListener('DOMContentLoaded', () => {
    //changing Value
    const changingValue = {
        squa: 0,
        angles: 4, 
        lamps: 0, 
        chandeliers: 0    
    };
    let manufacturer;

    Object.keys(changingValue).forEach(key => {
        console.log(document.getElementById(key));
        document.getElementById(key).innerHTML = changingValue[key];
    });

    function setText(name, value, max = 0){
        changingValue[name] = Math.max(changingValue[name] + value, max);
        document.getElementById(name).innerHTML = changingValue[name];
    };

    function setTextAndCalcResult(name, value, max){
        setText(name, value, max);
        result.textContent = calcTotal(manufacturer);
    };

    decrementSquare.addEventListener('click', () => {
        setTextAndCalcResult('squa', -1);
    });

    incrementSquare.addEventListener('click', () => {
        setTextAndCalcResult('squa', 1);
    });

    decrementAngle.addEventListener('click', () => {
        setTextAndCalcResult('angles', -1, 4);
    });

    incrementAngle.addEventListener('click', () => {
        setTextAndCalcResult('angles', 1, 4);
    });

    decrementLamps.addEventListener('click', () => {
        setTextAndCalcResult('lamps', -1);
    });

    incrementLamps.addEventListener('click', () => {
        setTextAndCalcResult('lamps', 1);
    });

    decrementChandeliers.addEventListener('click', () => {
        setTextAndCalcResult('chandeliers', -1);
    });

    incrementChandeliers.addEventListener('click', () => {
        setTextAndCalcResult('chandeliers', 1);
    });

    const dPremiun = { id: 0, name:'D-Premium', cost: 580};
    const clipso = { id: 1, name: 'Clipso', cost: 2390};
    const cerutti = { id: 2, name: 'Cerutti', cost: 2550};
    const classic = { id: 3, name: 'Classic', cost: 140};
    const pongs = { id: 4, name: 'Pongs', cost: 390};
    const evolution = { id: 5, name: 'Evolution', cost: 290};
    const teqtum = { id: 6, name: 'Teqtum', cost: 440};
    const premium = { id: 7, name: 'Premium', cost: 190};
    const lumfer = { id: 8, name: 'Lumfer', cost: 660};
    const coldStretch = { id: 9, name: 'Cold Stretch', cost: 390};

    let manufacturers = {
        tissue: [dPremiun, clipso, cerutti],
        matt: [classic, pongs, evolution, teqtum, premium, lumfer,coldStretch],
        glossy: [classic, pongs, evolution, teqtum, lumfer],
        satin: [classic, pongs, evolution, teqtum, lumfer],
    };

    let materials = [
        {id: 'matt', name: 'Матовые'},
        {id: 'glossy', name: 'Глянцевые'},
        {id: 'satin', name: 'Сатиновые'},
        {id: 'tissue', name: 'Тканевые'}
    ];
    let prevMaterial;
    let prevManufacturer;

    function showList(items) {
        const list = document.getElementById('manufacturers-list');
        list.innerHTML = '';

        for(let i = 0; i < items.length; i++){
            const item = items[i];
            const htmlItem = document.createElement("LI");
            const textnode = document.createTextNode(item['name']);
            htmlItem.appendChild(textnode);
            htmlItem.classList.add('calc__manufacturer-name');
            htmlItem.addEventListener('click', () => {
                if (prevManufacturer) {
                    prevManufacturer.classList.remove('active-btn');
                }
                htmlItem.classList.add('active-btn');
                manufacturer = item['cost'];
                prevManufacturer = htmlItem;
                result.textContent = calcTotal(manufacturer);
            })

            list.appendChild(htmlItem);
        };
    }

    function showMaterials(items) {
        const list = document.getElementById('materials-list');
        list.innerHTML = '';

        for(let i = 0; i < items.length; i++){
            const item = items[i];
            const htmlItem = document.createElement("LI");
            const textnode = document.createTextNode(item['name']);
            htmlItem.appendChild(textnode);
            htmlItem.classList.add('calc__type-texture-name');
            htmlItem.addEventListener('click', () => {
                prevManufacturer = undefined;
                manufacturer = undefined;
                if (prevMaterial) {
                    prevMaterial.classList.remove('active-btn');
                }
                htmlItem.classList.add('active-btn');
                prevMaterial = htmlItem;
                let id = item['id'];
                showList(manufacturers[id]);
                result.textContent = calcTotal(manufacturer);
            })
            list.appendChild(htmlItem);
        };
    }
    showMaterials(materials);

    //calc
    const result = document.querySelector('.calc__total-value');

    function calcTotal(manufacturer) {
        const squa = changingValue['squa'],
              angle = changingValue['angles'],
              lamp = changingValue['lamps'],
              chandelier = changingValue['chandeliers'];

        if (!manufacturer || !squa || !angle || !lamp || !chandelier) {
            return '___';
        }

        return(manufacturer * squa + 180 * angle + 290 * lamp + 450 * chandelier + '₽');

    }

    result.textContent = calcTotal(undefined);


});