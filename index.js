// TODO: iphone, samsung, huawei, oppo, redmi,.data.length

// Search for Phones
const searchPhone = () => {

    // Take data from searchfield
    const searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    // for Testing purpose
    searchText = 'huawei';
    console.log(searchText);

    // Fetching data from cloud
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))

}

const displaySearchResult = phones => {
    console.log(phones);

    // Taking search result id from dom
    const searchResult = document.getElementById('search-result');
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

// Loading Phone Details
const loadPhoneDetail = id => {
    console.log(id);
    //fetching phone data from cloud
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
};

// Displaying Phone Detail
const displayPhoneDetail = phone => {
    console.log(phone);
}
