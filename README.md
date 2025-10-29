# 🗺️ Emalytics POI Finder

**Emalytics POI Finder** is an interactive web application built with **FastAPI**, **Leaflet.js**, and **Docker**.  
It allows users to explore nearby **Points of Interest (POIs)** such as schools, pharmacies, and restaurants, using data from **OpenStreetMap** via the **Overpass API**.

Users can enter coordinates, choose a POI type and radius, and instantly visualize results on an interactive map.

---

## 🚀 Features

- 🌍 Interactive map built with **Leaflet.js**
- ⚡ Fast backend powered by **FastAPI**
- 🧭 Fetches real POI data from **Overpass API (OpenStreetMap)**
- 📏 Calculates distances using **Geopy**
- 🐳 Fully containerized with **Docker**
- 🎨 Custom colored map markers by POI type
- 💻 Clean and responsive HTML interface using **Jinja2 templates**

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | FastAPI (Python 3.11) |
| **Frontend** | HTML, CSS, JavaScript (Leaflet.js) |
| **Data Source** | Overpass API (OpenStreetMap) |
| **Geolocation** | Geopy |
| **Containerization** | Docker |

---

## 🧱 Project Structure

```
poi_api/
│
├── app.py                 # FastAPI backend
├── requirements.txt       # Project dependencies
├── Dockerfile             # Docker build configuration
│
├── templates/
│   └── index.html         # HTML interface
│
└── static/
    └── script.js          # Frontend logic (map + API calls)
```

---

## ⚙️ Run Locally

### 1️⃣ Create and activate a Conda environment (optional)

```bash
conda create -n docker_poi_api python=3.11
conda activate docker_poi_api
```

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run the app locally

```bash
uvicorn app:app --reload
```

Then open your browser at:  
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🐳 Run with Docker

### 1️⃣ Build the Docker image

```bash
docker build -t emalytics-poi-finder:v1.0 .
```

### 2️⃣ Run the container

```bash
docker run -p 8000:8000 emalytics-poi-finder:v1.0
```

### 3️⃣ Access the app

Open: 👉 [http://localhost:8000](http://localhost:8000)

---

## 🧭 Example Usage

1. Enter coordinates (latitude and longitude)  
2. Select the type of POI (school, pharmacy, restaurant)  
3. Set the search radius (in meters)  
4. Click **Search**  
5. View the POIs plotted on the map, each color-coded by category:
   - 🟦 Schools (blue)  
   - 🟩 Pharmacies (green)  
   - 🟥 Restaurants (red)

---

## 🧾 API Endpoint

### `GET /pois`

**Query parameters:**

| Parameter | Type | Description |
|------------|------|-------------|
| `lat` | float | Latitude coordinate |
| `lon` | float | Longitude coordinate |
| `poi_type` | string | POI type (`school`, `pharmacy`, `restaurant`) |
| `radius` | int | Search radius in meters |

**Example:**
```
/pois?lat=41.1579&lon=-8.6291&poi_type=school&radius=1000
```

**Response:**
```json
{
  "poi_type": "school",
  "coordinates": {"lat": 41.1579, "lon": -8.6291},
  "total_pois": 8,
  "average_distance_m": 427.3,
  "pois": [
    {"name": "Colégio Nossa Senhora", "latitude": 41.1584, "longitude": -8.6253, "distance_m": 215.8}
  ]
}
```

---

## 📦 Requirements

- Python 3.11+
- Docker Desktop (for containerized setup)
- Internet connection (Overpass API queries live data)

---

## 🌐 Deployment

You can deploy this Docker image to any container platform:

- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
- [Azure App Service](https://azure.microsoft.com/)
- [Google Cloud Run](https://cloud.google.com/run)

Once deployed, the app can be integrated directly into your website (e.g., [https://emalytics.pt/poi](https://emalytics.pt/poi)).

---

## 📸 Preview

![App Screenshot](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/OpenStreetMap_logo.svg/2560px-OpenStreetMap_logo.svg.png)

---

## 👨‍💻 Author

**E. Gomes**  
Data Analyst @ [Emalytics.pt](https://emalytics.pt)  
📍 Portugal  
💼 Focused on data analysis, geospatial intelligence, and digital innovation.

---

## 🧠 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
