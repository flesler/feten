exports.getCategories = function() {
  return categories; 
};

exports.getCategory = function(id) {
  return categoriesById[id];
};

exports.byId = function(id) {
  return productsById[id];
};

exports.all = function() {
  return all;
};

exports.getFeatured = function() {
  return featured;
};

var categories = [
  {name:'Organizadores', products: [
    {
     name:'Juanchuzzz', short:'Organizador de Escritorio', featured:true,
     photos:[[28, 165], [310, 170], [160, 178], [110, 160]],
     description:'Es muy simple, pegas los plotters en tu escritorio y siempre vas a tener a mano lo que\
      necesites...Celular, abrochadora, taza, anteojos, regla, pendrive, lapices, block y mouse.',
     size:'plancha tamaño A4',
     colors:['negro', 'blanco'],
     amount: 13
    },
    {
     name:'Te toca a vos', short:'Organizador de Alacena', featured:true,
     photos:[[170, 190], [300, 170], [20, 140], [300, 185]],
     description:'No hay excusa, todos pueden colaborar...Ahora van a saber dónde está toda la vajilla!',
     size:'2 planchas tamaño A4',
     colors:['negro', 'blanco'],
     amount: 10
    },
    {
     name:'Pibes', short:'Organizador de Juguetes', featured:true,
     photos:[[176, 100], [168, 190], [40, 168], [182, 143]],
     description:'Ayudemos a los más chiquitos de la casa a crear el hábito del orden, de una manera divertida y sin dolores de cabeza!',
     size:'2 planchas tamaño A4',
     colors:['verde', 'violeta', 'rojo', 'azul'],
     amount: 13
    },
    {
     name:'Pilchas', short:'Organizador de Placard',
     photos: [[253, 35], [205, 70], [162, 181], [92, 184], [200, 66], [214, 61]],
     description:'Para que esos momentos de 1 vez cada 2 meses sean rutina! Te ayudamos a mantener el orden del placard todo el año...',
     size:'plancha tamaño A4',
     colors:['negro', 'blanco'],
     amount: 10
    },
    {
     name:'Cubiertero', short:'Organizador de Mesa',
     photos: [[140, 140], [45, 122]],
     description:'Una simpática manera de tener un "individual" y no confundirnos con la vajilla del compañero.',
     size:'plancha tamaño A4',
     colors:['negro', 'blanco'],
     amount: 5
    }
  ]},
  {name:'Vinilos Decorativos', products: [
    {
     name:'Al fin llena', short:'Vinilo Decorativo', featured:true,
     photos:[[163, 87], [40, 220], [250, 230], [335, 52]],
     description:'Generamos un espejismo, una ilusión en el oasis de tu cocina...',
     size:'plancha tamaño A3',
     colors:['negro']
    },
    {
     name:'Apestoso', short:'Vinilo Decorativo',
     photos:[[194, 38]],
     description:'Recordamos que los olores desagradables necesitan de una pequeña ayuda para desaparecer.',
     size:'plancha tamaño A4',
     colors:['negro y rojo']
    },
    {
     name:'Dulces sueños', short:'Vinilo Decorativo', featured:true,
     photos:[[150, 30]],
     description:'Sabias “palabras”, “pensamientos profundos” que nos acompañan a la hora de dormir.',
     size:'plancha tamaño A3',
     colors:['negro', 'blanco']
    },
    {
     name:'No te olvides', short:'Vinilo Decorativo', featured:true,
     photos:[[120, 220], [300, 210]],
     description:'Para poner cerquita de la puerta y nunca olvidarte de lo más imprescindible!',
     size:'plancha tamaño A4',
     colors:['negro', 'blanco']
    },
    {
     name:'The Throne', short:'Vinilo Decorativo',
     photos:[[186, 48]],
     description:'Basta de injurias, llamemos a las cosas por su nombre!',
     size:'plancha tamaño A4',
     colors:['negro']
    },
    {
     name:'Woody Allen', short:'Vinilo Decorativo',
     photos: [[47, 21]],
     description:'Frase del mísitico director.',
     size:'plancha tamaño A3',
     colors:['negro', 'blanco']
    }
  ]},
  {name:'Cuadros', products: [
  ]},
  {name:'Vidrieras', products: [
  ]},
  {name:'Gráfica vehicular y marítima', products: [
  ]},
  {name:'Hacé tu Remera', products: [
  ]}
];

var categoriesById = {};
var productsById = {};
var all = [];
var featured = [];

var idRepl = {' ':'-', 'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ñ':'n'};
var illegalChars = '';
for (var chr in idRepl){
  illegalChars += chr;
} 
var re = new RegExp('['+illegalChars+']', 'g');

function addId(item) {
  item.id = item.name.toLowerCase().replace(re, function(chr){
    return idRepl[chr];
  });
};

categories.forEach(function(cat){
  addId(cat);
  categoriesById[cat.id] = cat;

  cat.url = '/catalogo/'+cat.id+'/';

  cat.products.forEach(function(prod){
    addId(prod);
    // Pre-calculate
    productsById[prod.id] = prod;
    all.push(prod);
    prod.category = cat;
    prod.url = cat.url + prod.id + '/';
    // Photos
    var old = prod.photos;
    prod.photos = [];
    for (var i = 0; i < old.length; i++) {
      var pos = old[i];
      var url = ['products', cat.id, prod.id, i+1].join('/');
      prod.photos.push({url:url, pos:pos});
    }
    // Featured
    if (prod.featured) {
      featured.push(prod);
    }
  });
});