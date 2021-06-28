"use strict"

document.addEventListener('DOMContentLoaded', () => {
    //changing Value
    const changingValue = {
        squa: 0,
        angles: 4, 
        lamps: 0, 
        chandeliers: 0    
    };
    let cloth,
    manufacturer = 1;

    Object.keys(changingValue).forEach(key => {
        console.log(document.getElementById(key));
        document.getElementById(key).innerHTML = changingValue[key];
    });

    function setText(name, value){
        changingValue[name] = Math.max(changingValue[name] + value, 0);
        document.getElementById(name).innerHTML = changingValue[name];
    };

    function setTextAndCalcResult(name, value){
        setText(name, value);
        result.textContent = calcTotal();
    };

    decrementSquare.addEventListener('click', () => {
        setTextAndCalcResult('squa', -1);
    });

    incrementSquare.addEventListener('click', () => {
        setTextAndCalcResult('squa', 1);
    });

    decrementAngle.addEventListener('click', () => {
        setTextAndCalcResult('angles', -1);
    });

    incrementAngle.addEventListener('click', () => {
        setTextAndCalcResult('angles', 1);
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

    let manufacturers = {
        tissue: ['D-Premium', 'Clipso', 'Cerutti'],
        matt: ['Classic','Pongs', 'Evolution', 'Teqtum', 'Premium', 'Lumfer','Cold Stretch'],
        glossy: ['Classic', 'Pongs', 'Evolution', 'Premium', 'Lumfer'],
        satin: ['Classic', 'Pongs', 'Evolution', 'Premium', 'Lumfer'],
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
            const textnode = document.createTextNode(item);
            htmlItem.appendChild(textnode);
            htmlItem.classList.add('calc__manufacturer-name');
            htmlItem.addEventListener('click', () => {
                if (prevManufacturer !== undefined) {
                    prevManufacturer.classList.remove('active-btn');
                }
                htmlItem.classList.add('active-btn');
                prevManufacturer = htmlItem;
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
                if (prevMaterial !== undefined) {
                    prevMaterial.classList.remove('active-btn');
                }
                htmlItem.classList.add('active-btn');
                prevMaterial = htmlItem;
                let id = item['id'];
                showList(manufacturers[id]);
            })
            list.appendChild(htmlItem);
        };
    }
    showMaterials(materials);

    
    
    //calc
    const result = document.querySelector('.calc__total-value');
    
    function calcTotal() {
        // if (!cloth || !manufacturer || !squa || !angle || !lamp || !chandelier) {
        //     result.textContent = '___';
        //     return;
        // }

        // manufacturer *

        return(changingValue['squa'] + 180 * changingValue['angles'] + 290 * changingValue['lamps'] + 450 * changingValue['chandeliers'] + '₽');

    }

    calcTotal();

    // function getStaticInfo(parentSelector, activeClass){
    //     const elements = document.querySelectorAll(`${parentSelector} li`);

    //     elements.forEach(elem => {
    //         elem.addEventListener('click', (e) => {
    //             if(e.target.getAttribute('id')){
    //                 cloth = e.target.getAttribute('id');
    //             }
    
    //             console.log(cloth);
    
    //             elements.forEach(elem => {
    //                 elem.classList.remove(activeClass);
    //             });
    
    //             e.target.classList.add(activeClass);
    //         });
    //     });

    // }


    // getStaticInfo('#type-texture', 'active-btn');
    // getStaticInfo('#manufacturer', 'active-btn');
    
    // getStaticInfo
})