from fastapi import FastAPI, Request, Query
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import requests
from geopy.distance import geodesic

app = FastAPI(title="Emalytics POI Finder")

# Mount templates and static files
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    """Render the main HTML interface."""
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/pois")
def get_pois(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    poi_type: str = Query("school", description="POI type (e.g., school, pharmacy, restaurant)"),
    radius: int = Query(1000, description="Search radius in meters")
):
    """Fetch nearby POIs from the Overpass API based on coordinates and radius."""
    
    query = f"""
    [out:json];
    node(around:{radius},{lat},{lon})["amenity"="{poi_type}"];
    out;
    """
    response = requests.get("https://overpass-api.de/api/interpreter", params={"data": query})
    data = response.json()

    pois = []
    distances = []

    for el in data.get("elements", []):
        name = el["tags"].get("name", "Unnamed")
        poi_coords = (el["lat"], el["lon"])
        distance = geodesic((lat, lon), poi_coords).meters
        distances.append(distance)
        pois.append({
            "name": name,
            "latitude": el["lat"],
            "longitude": el["lon"],
            "distance_m": round(distance, 1)
        })

    if not pois:
        return {"message": f"No POIs of type '{poi_type}' found within {radius} meters."}

    return {
        "poi_type": poi_type,
        "coordinates": {"lat": lat, "lon": lon},
        "total_pois": len(pois),
        "average_distance_m": round(sum(distances) / len(distances), 1),
        "pois": pois
    }
