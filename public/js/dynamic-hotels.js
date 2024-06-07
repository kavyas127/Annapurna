document.addEventListener("DOMContentLoaded", () => {
    const donors = [
        // Sample donor data
        { Name: 'Restaurant A', address: 'Address A', serving_quantity: '50', phone_number: '1234567890', rest_site: 'http://example.com/a', closing_time: '9 PM' },
        { Name: 'Restaurant B', address: 'Address B', serving_quantity: '60', phone_number: '2345678901', rest_site: 'http://example.com/b', closing_time: '10 PM' },
        { Name: 'Restaurant C', address: 'Address C', serving_quantity: '70', phone_number: '3456789012', rest_site: 'http://example.com/c', closing_time: '11 PM' },
        { Name: 'Restaurant D', address: 'Address D', serving_quantity: '80', phone_number: '4567890123', rest_site: 'http://example.com/d', closing_time: '12 PM' },
        { Name: 'Restaurant E', address: 'Address E', serving_quantity: '90', phone_number: '5678901234', rest_site: 'http://example.com/e', closing_time: '1 AM' },
        // Add more donors as needed
    ];

    const hotelsContainer = document.getElementById('hotels-container');
    let hotelsList = document.createElement('div');
    hotelsList.classList.add('hotels-list');
    hotelsContainer.appendChild(hotelsList);

    donors.forEach((donor, index) => {
        if (index > 0 && index % 3 === 0) {
            hotelsList = document.createElement('div');
            hotelsList.classList.add('hotels-list');
            hotelsContainer.appendChild(hotelsList);
        }
        
        const hotelDiv = document.createElement('div');
        hotelDiv.classList.add('hotel', 'avail');

        hotelDiv.innerHTML = `
            <p class="hitem"><span class="h">Restaurant Name: </span>${donor.Name}</p>
            <p class="hitem"><span class="h">Restaurant Address: </span>${donor.address}</p>
            <p class="hitem"><span class="h">Serving Quantity: </span>${donor.serving_quantity}</p>
            <p class="hitem"><span class="h">Contact Number: </span>${donor.phone_number}</p>
            <p class="hitem"><span class="h">Website Link: </span><a href="${donor.rest_site}">${donor.rest_site}</a></p>
            <p class="hitem"><span class="h">Best Before: </span>${donor.closing_time}</p>
            <button class="book-food" type="submit"><a href="receiver-info">Distribute</a></button>
        `;

        hotelsList.appendChild(hotelDiv);
    });
});
