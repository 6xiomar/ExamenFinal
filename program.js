    
    // MAPAAAAAAAS SECCIÓN 2
    document.addEventListener("DOMContentLoaded", function () {
        // Definir capas de mapa
        var mapaBase = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        });
    
        var mapaSatelital = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        });
    
        // Crear los dos mapas
        var mapaIzquierda = L.map("mapa-izquierda", { layers: [mapaBase], zoomControl: false }).setView([4.567766586507188, -74.06951836640832], 17);
        var mapaDerecha = L.map("mapa-derecha", { layers: [mapaSatelital], zoomControl: false, attributionControl: false }).setView([4.567766586507188, -74.06951836640832], 17);
    
        // Sincronizar ambos mapas
        mapaIzquierda.sync(mapaDerecha);
        mapaDerecha.sync(mapaIzquierda);
    
        // Cargar el polígono en ambos mapas
        fetch("barrioGranColombia.geojson")
            .then(response => response.json())
            .then(data => {
                var poligonoLayer = L.geoJSON(data, {
                    style: { color: "red", weight: 2, opacity: 0.7 }
                });
                poligonoLayer.addTo(mapaIzquierda);
                poligonoLayer.addTo(mapaDerecha);
            })
            .catch(error => console.error("Error cargando el GeoJSON:", error));
    
        // Funcionalidad del slider
        var slider = document.getElementById("slider");
        slider.addEventListener("input", function () {
            var percentage = slider.value;
            document.getElementById("mapa-derecha").style.width = `${percentage}%`;
            document.getElementById("slider").style.left = `${percentage}%`;
        });
    });
    