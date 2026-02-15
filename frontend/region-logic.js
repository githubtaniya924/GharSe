document.addEventListener('DOMContentLoaded', async () => {
    const selectedCity = localStorage.getItem('selectedCity');
    document.getElementById('city-title').innerText = selectedCity;

    // 1. Fetch data from your Backend API
    // Replace URL with your local server address (e.g., http://localhost:5000/api/regions/Mumbai)
    const response = await fetch(`/api/regions/${selectedCity}`);
    const regions = await response.json();

    const regionList = document.getElementById('region-list');
    const chefContainer = document.getElementById('chef-container');
    const regionHeader = document.getElementById('selected-region-name');

    // 2. Create Region Buttons
    regions.forEach(region => {
        const btn = document.createElement('button');
        btn.className = 'region-btn';
        btn.innerText = region.regionName;
        
        btn.onclick = () => {
            // Update Active State
            document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Display Chefs for this region
            displayChefs(region);
        };
        regionList.appendChild(btn);
    });

    function displayChefs(region, filterCuisine = 'All') {
    const chefContainer = document.getElementById('chef-container');
    const cuisineList = document.getElementById('cuisine-list');
    const regionHeader = document.getElementById('selected-region-name');

    regionHeader.innerText = `Chefs in ${region.regionName}`;
    chefContainer.innerHTML = ''; 

    // 1. Setup Cuisine Filter Buttons (only do this when 'All' is selected/first click)
    if (filterCuisine === 'All') {
        cuisineList.innerHTML = '';
        
        // Create an 'All' button
        const allBtn = createCuisineBtn('All', region);
        allBtn.classList.add('active');
        cuisineList.appendChild(allBtn);

        // Get unique cuisine names from this region
        region.cuisines.forEach(c => {
            const btn = createCuisineBtn(c.cuisineName, region);
            cuisineList.appendChild(btn);
        });
    }

    // 2. Filter and Display Chefs
    region.cuisines.forEach(cuisine => {
        // Skip this cuisine if a filter is active and doesn't match
        if (filterCuisine !== 'All' && cuisine.cuisineName !== filterCuisine) return;

        cuisine.chefs.forEach(chef => {
            const card = document.createElement('div');
            card.className = 'chef-card';
            card.innerHTML = `
                <p class="cuisine-tag">${cuisine.cuisineName}</p>
                <h4>${chef.name}</h4>
                <p class="specialty-list"><b>Specialties:</b> ${chef.specialties.join(', ')}</p>
                <div class="price-tag">₹${chef.price}</div>
            `;
            chefContainer.appendChild(card);
        });
    });
}

// Helper function to create Cuisine buttons
function createCuisineBtn(name, region) {
    const btn = document.createElement('button');
    btn.className = 'cuisine-btn';
    btn.innerText = name;
    btn.onclick = () => {
        document.querySelectorAll('.cuisine-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayChefs(region, name); // Re-run display with filter
    };
    return btn;
}
});