import states from '../../assets/brazil-states.json'

let map, info, legend, geoJson, ufSummary

function getColor(d) {
    return d > 6 ? '#800026' :
        d > 5  ? '#BD0026' :
        d > 4  ? '#E31A1C' :
        d > 3  ? '#FC4E2A' :
        d > 2   ? '#FD8D3C' :
        d > 1   ? '#FEB24C' :
        d > 0   ? '#FED976' :
                    '#FFEDA0';
}

function getColorByState(state) {
    const d = ufSummary[state.sigla] || 0
    return getColor(d)
}

function style(feature) {
    return {
        fillColor: getColorByState(feature.properties),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geoJson.resetStyle(e.target);
    info.update()
}
  
function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds())
}
  
function onEachFeature(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    })
}


export function setupMap(elementId, summary){
    console.log(states)
    ufSummary = summary
    map = L.map(elementId).setView([-15.7801, -47.9292], 4);

    info = L.control()
    legend = L.control({position: 'bottomright'});

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery :copyright: <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1IjoiZWRnYXJkbG9wZXMiLCJhIjoiY2lmZnQ2Z3RjN20xc3I3bHg5czkxbDNhaCJ9.kj6Iag-iM0b4-zIg6-hl1Q'
    }).addTo(map);


    geoJson = L.geoJson(states, {style: style, onEachFeature: onEachFeature}).addTo(map);


    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    info.update = function (props) {
        if(props){
            console.log( ufSummary[props.sigla] || 0)
        }
        this._div.innerHTML = '<h4>Usuários cadastrados</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + (ufSummary[props.sigla] || 0) + ' usuários'
            : 'Passe o cursor sobre um estado');
    };
    info.addTo(map);



    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 2, 3, 4, 5, 6],
            labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };


    legend.addTo(map)
}