const monggose = require('mongoose');
monggose.connect('mongodb+srv://jonatan:12345@cluster0.eumt7.mongodb.net/area51contribuyentes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));