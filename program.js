    
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
                    style: { color: "purple", weight: 2, opacity: 0.7 }
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
    




    // mapa tercera sección

    document.addEventListener("DOMContentLoaded", function () {
        // Inicializar el mapa
        var mapa = L.map("mapa").setView([4.548900134233985, -74.06660742480192], 13); // Reemplaza con las coordenadas de tu barrio
    
        // Cargar capa base de OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(mapa);
    
        // Cargar el polígono desde un archivo GeoJSON
        fetch("localidadGranColombia.geojson") // Asegúrate de tener este archivo en la misma carpeta
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, {
                    style: {
                        color: "green",
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
    


    // información del polígonoss

    document.addEventListener("DOMContentLoaded", function () {
        fetch("barrioGranColombia.geojson")
            .then(response => response.json())
            .then(data => {
                // Calcular Área
                var area = turf.area(data);
                document.getElementById("area").textContent = area.toFixed(2);
    
                // Calcular Perímetro
                var perimetro = turf.length(data, { units: "meters" });
                document.getElementById("perimetro").textContent = perimetro.toFixed(2);
    
                // Calcular Centroide
                var centroide = turf.centroid(data);
                document.getElementById("centroide").textContent = `[${centroide.geometry.coordinates[1]}, ${centroide.geometry.coordinates[0]}]`;
    
                // Mostrar Vértices
                var vertices = data.features[0].geometry.coordinates[0];
                document.getElementById("vertices").textContent = JSON.stringify(vertices, null, 2);
            })
            .catch(error => console.error("Error al cargar el GeoJSON:", error));
    });
    