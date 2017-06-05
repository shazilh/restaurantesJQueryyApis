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
        "direccion": "Newton 55, Col.Polanco,Cd. de México"
        
	},
	{
		"nombre": "Pujol",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Francisco Petrarca 254, Col. Polanco."
	},
	{
		"nombre": "Biko",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Mazarik 407, Col.Polanco."
	},
	{
		"nombre": "Pangea",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Bosques del Valle 110, Col.Bosques del Valle."
	},
	{
		"nombre": "Amaranta",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Francisco Murguía 402, Universidad, Toluca de Lerdo."
	},
	{
		"nombre": "Sud 777",
		"numero": "+51986161136",
		"foto": "http://via.placeholder.com/200x200",
        "direccion": "Blvd. de la Luz 777, Jardines del Pedregal."
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
                 '<a href="#">'+
                'Ver mapa:__mapa__'+'</a>'+
              '</div>'+
            '</div>' +
          '</div>' +
        '</div>' +
	'</article>';

var cargarPagina = function () {
	$("#search-form").submit(filtrarRestaurantes);
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
		plantillaFinal += plantillaRestaurantes.replace("__nombre__", restaurantes.nombre)
			.replace("__numero__", restaurantes.numero)
			.replace("__foto__", restaurantes.foto)
            .replace("__mapa__", restaurantes.direccion);
	});
	$(".restaurantes").html(plantillaFinal);
};

$(document).ready(cargarPagina);

