// TODO: iphone, samsung, huawei, oppo, redmi,.data.length

// Search for Phones
const searchPhone = () => {

    // Take data from searchfield
    const searchField = document.getElementById('search-field');
    let searchText = searchField.value;

    // Clearing search field value
    // searchField.value = '';

    // for Testing purpose
    searchText = 'iphone';
    console.log(searchText);

    // Clear Single phone data while searching
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

    // Search Field Input Validation for Number and empty input
    if (searchText == '' || !isNaN(searchText)) {
        document.getElementById('search-error').style.display = 'block';
    } else {
        document.getElementById('search-error').style.display = 'none';
        // Fetching data from cloud
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
    }
};

// Display Phones
const displayPhones = phones => {
    console.log(phones);
    // Taking search result id from dom
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    phones.forEach(phone => {
        // creating a div to show phone
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-3">

                <div class="d-flex justify-content-center">
                <img src="${phone.image}" class="w-50 card-img-top" alt="...">
                </div>

                <div class="card-body d-flex justify-content-between">
                    <h5 class="card-title text-success">${phone.phone_name}</h5>
                    <p class="card-text fw-bold text-danger">${phone.brand}</p>   
                </div>

                <button onclick="loadPhoneDetail('${phone.slug}')" class="btn text-dark bg-warning fw-bold">Details</button>
            </div>
        
        `;
        searchResult.appendChild(div);
    });
};


const displaySearchResult = phones => {
    console.log(phones);
    console.log(phones.length);

    // Taking search result id from dom
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // Filtering 20 phones to display
    const phones_20 = phones.filter((phone, index) => {
        if (index < 20) {
            // TODO:console.log(phone,index);
            return phone;
        }
    })
    console.log(phones_20);
    console.log(phones_20.length);

    // Displaying 20 Phones
    displayPhones(phones_20);

    // displaying all phones Button   ${displayPhones(phones)}
    const divButton = document.createElement('div');
    divButton.classList.add('d-flex', 'align-items-center', 'justify-content-center');

    // Validating button for wrong input
    if (phones.length > 0) {

        document.getElementById('wrong-input-error').style.display = 'none';

        divButton.innerHTML = `
            <button  id="div-button" class="btn text-dark fw-bold bg-warning p-2">See All</button>
    `;
        searchResult.appendChild(divButton);
        // Adding event listener to the--> See All phones button 
        document.getElementById('div-button').addEventListener('click', () => {
            displayPhones(phones);
        });
    } else {
        document.getElementById('wrong-input-error').style.display = 'block';
    }
};

// Check Release Date
const checkReleaseDate = phone => {
    if (phone.releaseDate) {
        return phone.releaseDate;
    } else {
        return "Release Date Not Available";
    }
}

// Loading Phone Details
const loadPhoneDetail = id => {
    console.log(id);
    //fetching phone data from cloud
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
};

// Displaying Single Phone Details
const displayPhoneDetail = phone => {
    console.log(phone);
    // Taking single phone details id from dom
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

    // Creating 4 divs to display details of a phone
    // 1. Image,name,brand,release date
    // 2.Main Features
    // 3.sensors and
    // 4.Others

    // displaying Image,name,brand,release date
    const div1 = document.createElement('div');
    div1.classList.add('col');
    div1.innerHTML = `

        <div class=" m-3 d-flex justify-content-center">
            <img src="${phone.image}" class="w-50" alt="...">
        </div>

        <div class="d-flex justify-content-evenly">
            <h4 class="text-success fw-bold">${phone.name}</h4>
            <p class="fw-bold text-danger">${phone.brand}</p>   
        </div>

        <div class="d-flex justify-content-evenly mb-3">
            <span class="text-success">Release Date:</span>
            <span class="text-info">${checkReleaseDate(phone)}</span>
        </div>

    `;
    phoneDetails.appendChild(div1);



    // Displaying Main Features
    const div2 = document.createElement('div');
    div2.classList.add('col', 'middle-everything');
    div2.innerHTML = `
        <div class="text-center">
            <h4 class="fw-bold text-dark bg-warning rounded-pill ">Main Features</h4>

    <div class="d-flex flex-column">
        <span class="text-warning">Chipset:</span>
        <span class="ps-3 text-primary">${phone.mainFeatures.chipSet}</span></div>

    <div class="d-flex flex-column">
    <span class="text-warning">Memory:</span>
    <span class="ps-3 text-primary">${phone.mainFeatures.memory}</span></div>

    <div class="d-flex flex-column">
    <span class="text-warning">Storage:</span>
    <span class="ps-3 text-primary">${phone.mainFeatures.storage}</span></div>

    <div class="d-flex flex-column">
    <span class="text-warning">Display Size:</span>
    <span class="ps-3 text-primary">${phone.mainFeatures.displaySize}</span></div>

    </div>
    `;
    phoneDetails.appendChild(div2);

    // displaying Sensors
    // Keeping sensors in a variable
    const sensors = phone.mainFeatures.sensors;
    console.log(sensors);
    const div3 = document.createElement('div');
    div3.classList.add('col');
    div3.classList.add('middle-everything');
    div3.innerHTML = `
        <h3 class="fw-bold text-dark bg-warning rounded-pill p-2">Sensors</h3>
    `;
    sensors.forEach(sensor => {
        const p = document.createElement('p');
        console.log(sensor);
        p.textContent = `${sensor}`;
        div3.appendChild(p);
    })
    phoneDetails.appendChild(div3);



    // Displaying Others
    const div4 = document.createElement('div');
    div4.classList.add('col', 'middle-everything');

    // Checking whether data is available or not
    if (phone.others) {
        div4.innerHTML = `

    <div class="text-center">
        <h3 class="fw-bold text-dark bg-warning rounded-pill p-2">Others</h3>
    
    <div class="d-flex flex-column">
        <span class="text-warning">WLAN</span>
        <span class="ps-3 text-primary">${phone.others?.WLAN}</span></div>

    <div class="d-flex flex-column">
        <span class="text-warning">Bluetooth</span>
        <span class="ps-3 text-primary">${phone.others?.Bluetooth}</span></div>

    <div class="d-flex flex-column">
        <span class="text-warning">GPS</span>
        <span class="ps-3 text-primary">${phone.others?.GPS}</span></div>

    <div class="d-flex flex-column">
        <span class="text-warning">NFC</span>
        <span class="ps-3 text-primary">${phone.others?.NFC}</span></div>

    <div class="d-flex flex-column">
        <span class="text-warning">Radio</span>
        <span class="ps-3 text-primary">${phone.others?.Radio}</span></div>

    </div>
    `;
    } else {
        div4.innerHTML = `<span class="text-info">No data Found</span>`;
    }
    phoneDetails.appendChild(div4);
}
