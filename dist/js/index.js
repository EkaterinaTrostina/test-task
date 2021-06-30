"use strict"

document.addEventListener('DOMContentLoaded', () => {
    //changing Value
    const minAngles = 4,
          minDefault = 0,
          maxDefault = 6;

    const changingValue = {
        squa: minDefault,
        angles: minAngles, 
        lamps: minDefault, 
        chandeliers: minDefault    
    };
    
    let manufacturer;

    Object.keys(changingValue).forEach(key => {
        console.log(document.getElementById(key));
        document.getElementById(key).innerHTML = changingValue[key];
    });

    function setText(name, value, min, max){
        let actualValue = Math.max(changingValue[name] + value, min);
        if(max){
            actualValue = Math.min(actualValue, max)
        }
        changingValue[name] = actualValue;
        document.getElementById(name).innerHTML = changingValue[name];
    };

    function setTextAndCalcResult(name, value, min = minDefault, max = maxDefault){
        setText(name, value, min, max);
        result.textContent = calcTotal(manufacturer);
    };

    decrementSquare.addEventListener('click', () => {
        setTextAndCalcResult('squa', -1);
    });

    incrementSquare.addEventListener('click', () => {
        setTextAndCalcResult('squa', 1);
    });

    decrementAngle.addEventListener('click', () => {
        setTextAndCalcResult('angles', -1, minAngles);
    });

    incrementAngle.addEventListener('click', () => {
        setTextAndCalcResult('angles', 1, minAngles);
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

    // const dPremiun = { id: 0, name:'D-Premium', cost: 580};
    // const clipso = { id: 1, name: 'Clipso', cost: 2390};
    // const cerutti = { id: 2, name: 'Cerutti', cost: 2550};
    // const classic = { id: 3, name: 'Classic', cost: 140};
    // const pongs = { id: 4, name: 'Pongs', cost: 390};
    // const evolution = { id: 5, name: 'Evolution', cost: 290};
    // const teqtum = { id: 6, name: 'Teqtum', cost: 440};
    // const premium = { id: 7, name: 'Premium', cost: 190};
    // const lumfer = { id: 8, name: 'Lumfer', cost: 660};
    // const coldStretch = { id: 9, name: 'Cold Stretch', cost: 390};

    class Manufacturer{
        constructor(id, name, cost){
            this.id = id;
            this.name = name;
            this.cost = cost;
        }
    }
    const dPremiun = new Manufacturer(0, 'D-Premium', 580);
    const clipso = new Manufacturer(1, 'Clipso', 2390);
    const cerutti = new Manufacturer(2, 'Cerutti', 2550);
    const classic = new Manufacturer(3, 'Classic', 140);
    const pongs = new Manufacturer(4, 'Pongs', 390);
    const evolution = new Manufacturer(5, 'Evolution', 290);
    const teqtum = new Manufacturer(6, 'Teqtum', 440);
    const premium = new Manufacturer(7, 'Premium', 190);
    const lumfer = new Manufacturer(8, 'Lumfer', 660);
    const coldStretch = new Manufacturer(9, 'Cold Stretch', 390);

    class Material {
        constructor(id, name, manufacturers){
            this.id = id;
            this.name = name;
            this.manufacturers = manufacturers;
        }
    };
    const matt = new Material('matt', 'Матовые', [classic, pongs, evolution, teqtum, premium, lumfer,coldStretch]);
    const tissue = new Material('matt', 'Тканевые', [dPremiun, clipso, cerutti]);
    const glossy = new Material('glossy', 'Глянцевые', [classic, pongs, evolution, teqtum, lumfer]);
    const satin = new Material('satin', 'Сатиновые', [classic, pongs, evolution, teqtum, lumfer]);

    // let materials = [
    //     {id: 'matt', 
    //         name: 'Матовые', 
    //         manufacturers: [classic, pongs, evolution, teqtum, premium, lumfer,coldStretch]
    //     },
    //     {id: 'tissue', 
    //         name: 'Тканевые',
    //         manufacturers: [dPremiun, clipso, cerutti]
    //     },
    //     {id: 'glossy', 
    //         name: 'Глянцевые',
    //         manufacturers: [classic, pongs, evolution, teqtum, lumfer]
    //     },
    //     {id: 'satin', 
    //         name: 'Сатиновые',
    //         manufacturers: [classic, pongs, evolution, teqtum, lumfer]
    //     }
    // ];
    let prevMaterial;
    let prevManufacturer;

    function showList(items) {
        const list = document.getElementById('manufacturers-list');
        list.innerHTML = '';

        for(let i = 0; i < items.length; i++){
            const item = items[i];
            const htmlItem = document.createElement("LI");
            const textnode = document.createTextNode(item.name);
            htmlItem.appendChild(textnode);
            htmlItem.classList.add('calc__manufacturer-name');
            htmlItem.addEventListener('click', () => {
                if (prevManufacturer) {
                    prevManufacturer.classList.remove('active-btn');
                }
                htmlItem.classList.add('active-btn');
                manufacturer = item.cost;
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
            const textnode = document.createTextNode(item.name);
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
                let id = item.id;
                showList(item.manufacturers);
                result.textContent = calcTotal(manufacturer);
            })
            list.appendChild(htmlItem);
        };
    }
    // showMaterials(materials);

    showMaterials([matt, tissue, glossy, satin]);
    // showMaterials(tissue);
    // showMaterials(glossy);
    // showMaterials(satin);
    //calc

    const result = document.querySelector('.calc__total-value'),
          angleCost = 180,
          lampCost = 290,
          chandelierCost = 450,
          currency = '₽';

    function calcTotal(manufacturer) {
        const squa = changingValue['squa'],
              anglesCount = changingValue['angles'],
              lampsCount = changingValue['lamps'],
              chandeliersCount = changingValue['chandeliers'];

        if (!manufacturer || !squa || !anglesCount || !lampsCount || !chandeliersCount) {
            return '___';
        }

        return(manufacturer * squa + angleCost * anglesCount + lampCost * lampsCount + chandelierCost * chandeliersCount + currency);

    }

    result.textContent = calcTotal(undefined);


});