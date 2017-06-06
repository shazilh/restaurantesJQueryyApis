function initMap() {
  var uluru = {lat: 19.417575, lng: -99.164701};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

var restaurantes = [
	{
		"nombre": "Quintonil",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Newton 55, Col.Polanco,Cd. de México",
        "coordenadas":{
            lat:19.4308557,
            lng:99.1938909
            
        }
	},
	{
		"nombre": "Pujol",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Francisco Petrarca 254, Col. Polanco.",
        "coordenadas":{
            lat:19.432394,
            lng:-99.1969973
            
        }
	},
	{
		"nombre": "Biko",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Mazarik 407, Col.Polanco.",
        "coordenadas":{
            lat:19.432113,
            lng:-99.2009208
            
        }
	},
	{
		"nombre": "Pangea",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Bosques del Valle 110, Col.Bosques del Valle.",
        "coordenadas":{
                lat:25.6501038,
                lng:-100.3785448

        }
	},
	{
		"nombre": "Amaranta",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Francisco Murguía 402, Universidad, Toluca de Lerdo.",
        "coordenadas":{
                lat:19.2810466,
                lng:-99.6586632

            }
	},
	{
		"nombre": "Sud 777",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Blvd. de la Luz 777, Jardines del Pedregal.",
        "coordenadas":{
                lat:19.3087534,
                lng:-99.2115435

            }
	}
];

var plantillaRestaurantes = '<article class="row restaurants">' +
        '<div class="card-panel hoverable grey lighten-5 z-depth-1">' +
          '<div class="row valign-wrapper">' +
            '<div class="col s3">' +
              '<img src="__foto__" alt="Contact" class="circle responsive-img">' +
            '</div>' +
            '<div class="col s9">' +
            	'<h5 class="name">__nombre__</h5>' +
              '<span class="black-text">' +
                'Phone: __numero__' +
              '</span>' +
              '<span class="black-text">' +
                'Direccion: __direccion__' +
              '</span>' +
              '<div class="card-action">'+
                 '<a data-latitud="__latitud__" data-longitud="__longitud__" class="mapaRestaurante" href="#">'+
                'Ver mapa:'+'</a>'+
              '</div>'+
            '</div>' +
          '</div>' +
        '</div>' +
	'</article>';

var cargarPagina = function () {
	$("#search-form").submit(filtrarRestaurantes);
    mostrarRestaurantes(restaurantes);
    
};

var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#search").val().toLowerCase();
	var restaurantesFiltrados = restaurantes.filter(function (restaurante) {
		return restaurante.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
	});
	mostrarRestaurantes(restaurantesFiltrados);
};

var mostrarRestaurantes = function (restaurantes) {
	var plantillaFinal = "";
	restaurantes.forEach(function (restaurante) {
		plantillaFinal += plantillaRestaurantes.replace("__nombre__", restaurante.nombre)
			.replace("__numero__", restaurante.numero)
			.replace("__foto__", restaurante.foto)
            .replace("__direccion__", restaurante.direccion)
            .replace("__latitud__",restaurante.coordenadas.lat)
            .replace("__longitud__",restaurante.coordenadas.lng);
	});
	$(".restaurantes").html(plantillaFinal);
    $(".mapaRestaurante").click(cambiarUbicacion);

};

$(document).ready(cargarPagina);
//funciones para mandar llamar mapas
function obtenerUbicacionActual() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicionActual);
  } else {
    alert("Geolocalización no es soportado en tu navegador");
  }
}

function mostrarPosicionActual(posicion) {
  var latitud = posicion.coords.latitude;
  var longitud = posicion.coords.longitude;

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  mostrarMapa(coordenadas);
}

function cambiarUbicacion() {
  var latitud = $(this).data("latitud");
  var longitud = $(this).data("longitud");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}
function mostrarMapa(coordenadas) {
  var map = new google.maps.Map($('#map')[0], {
    zoom: 17,
    center: coordenadas
  });
  var marker = new google.maps.Marker({
    position: coordenadas,
    map: map
  });
}
