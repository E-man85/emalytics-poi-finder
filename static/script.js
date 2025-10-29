const form = document.getElementById("poi-form");

// Initialize the map centered on Lisbon by default
const map = L.map("map").setView([38.7169, -9.1399], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Define custom icons by POI type
const icons = {
  school: L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  pharmacy: L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  restaurant: L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  default: L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const lat = parseFloat(document.getElementById("lat").value);
  const lon = parseFloat(document.getElementById("lon").value);
  const poiType = document.getElementById("tipo").value;
  const radius = parseInt(document.getElementById("raio").value);

  const url = `/pois?lat=${lat}&lon=${lon}&poi_type=${poiType}&radius=${radius}`;
  const response = await fetch(url);
  const data = await response.json();

  // Handle errors or empty results
  if (!data.pois) {
    alert(data.message || "No POIs found in this area.");
    return;
  }

  // Clear previous markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) map.removeLayer(layer);
  });

  // Center map on selected coordinates
  map.setView([lat, lon], 14);
  L.marker([lat, lon], { icon: icons.default })
    .addTo(map)
    .bindPopup("📍 Central point")
    .openPopup();

  // Add POI markers
  data.pois.forEach((p) => {
    const icon = icons[poiType] || icons.default;
    L.marker([p.latitude, p.longitude], { icon })
      .addTo(map)
      .bindPopup(`<b>${p.name}</b><br>${p.distance_m} m`);
  });
});
