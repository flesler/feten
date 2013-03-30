var products = require('./products'),
    email = require('./email');

// Index

app.get('/', function(req, res) {
    var featured = products.getFeatured();
    res.render('index', {title:'Inicio', featured: featured});
});

// About

app.get('/nosotros/', function(req, res) {
    res.render('about', {title:'Nosotros'});
});

// Contact

app.get('/contacto/', function(req, res) {
    res.render('contact/', {title:'Contacto'});
});

app.post('/contacto/', function(req, res) {
    var body = req.body;
    email.send(body, function(success){
        res.render('contact/thanks', {title:'Contacto', name: body.name, success:success});
    });
});

// Catalog

app.get('/catalogo/', function(req, res) {
    var categories = products.getCategories();
    var featured = products.getFeatured();
    res.render('catalog/', {title:'Catalogo', categories:categories, featured:featured});
});

app.get('/catalogo/:category/', function(req, res) {
    var id = req.params.category;
    var cat = products.getCategory(id);
    res.render('catalog/category', {title:cat.name, category:cat});
});

app.get('/catalogo/:category/:product/', function(req, res) {
    var id = req.params.product;
    var prod = products.byId(id);
    res.render('catalog/product', {title:prod.name, product:prod});
});
