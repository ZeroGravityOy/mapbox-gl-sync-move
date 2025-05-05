import mapboxgl from 'mapbox-gl';
import mapboxGlSync from '../src/index';
import './style.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

console.log('Mapbox access token:', import.meta.env, mapboxgl.accessToken);

const mapA = new mapboxgl.Map({
  container: 'map-light',
  style: 'mapbox://styles/mapbox/light-v9'
});

const mapB = new mapboxgl.Map({
  container: 'map-dark',
  style: 'mapbox://styles/mapbox/dark-v9'
});

const mapC = new mapboxgl.Map({
  container: 'map-basic',
  style: 'mapbox://styles/mapbox/basic-v9'
});

mapA.addControl(new mapboxgl.NavigationControl());
mapB.addControl(new mapboxgl.NavigationControl());
mapC.addControl(new mapboxgl.NavigationControl());

document.getElementById('fly-tucson')?.addEventListener('click', function() {
  mapB.flyTo({
    center: [-110.9265, 32.2217],
    zoom: 10
  });
});

document.getElementById('fly-france')?.addEventListener('click', function() {
  mapA.flyTo({
    center: [2.294694, 48.858093],
    zoom: 4
  });
});

mapboxGlSync(mapA, mapB, mapC);