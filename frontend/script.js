function selectCity(cityName) {
    console.log("Selected city:", cityName);
    
    // Store the selection so the next page knows what to show
    localStorage.setItem('selectedCity', cityName);
    
    // Redirect to the regions page (we will create this next!)
    window.location.href = "regions.html";
}