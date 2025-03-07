    
    // MAPAAAAAAA

document.addEventListener("DOMContentLoaded", function () {

    
    // Inicializar el mapa
    var mapa = L.map("mapa").setView([4.567803677123118, -74.06954441256678], 17); // Reemplaza con las coordenadas de tu barrio

    // Cargar capa base de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mapa);

    // Cargar el polígono desde un archivo GeoJSON
    fetch("barrioGranColombia.geojson") // Asegúrate de tener este archivo en la misma carpeta
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: "purple",
                    weight: 2,
                    opacity: 0.7
                }
            }).addTo(mapa);
        })
        .catch(error => console.error("Error cargando el GeoJSON:", error));

    // Funcionalidad de los botones
    document.getElementById("boton1").addEventListener("click", function () {
        alert("Botón 1 presionado");
    });

    document.getElementById("boton2").addEventListener("click", function () {
        alert("Botón 2 presionado");
    });

    document.getElementById("boton3").addEventListener("click", function () {
        alert("Botón 3 presionado");
    });
});