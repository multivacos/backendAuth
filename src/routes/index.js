const { Router } = require('express');
const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hola mundo'));

router.post('/registro', async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'secretKey')
    res.status(200).json({ token });
})

router.post('/ingreso', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('El correo electronico no existe');
    if (user.password !== password) return res.status(401).send('Password incorrecto');

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return res.status(200).json({ token });
})

router.get('/tareasPublicas', (req, res) => {
    res.json([{
            _id: 1,
            name: 'Tarea pública 1',
            description: "Descripcion pública 1",
            date: "2019-11-17T20:39:05:211Z"
        },
        {
            _id: 2,
            name: 'Tarea pública 2',
            description: "Descripcion pública 2",
            date: "2019-11-17T20:39:05:211Z"
        },
        {
            _id: 3,
            name: 'Tarea pública 3',
            description: "Descripcion pública 3",
            date: "2019-11-17T20:39:05:211Z"
        },
        {
            _id: 4,
            name: 'Tarea pública 4',
            description: "Descripcion pública 4",
            date: "2019-11-17T20:39:05:211Z"
        }
    ])
})

router.get('/tareasPrivadas', verificarToken, (req, res) => {
    res.json([{
            _id: 1,
            name: 'Tarea privada 1',
            description: "Descripcion privada 1",
            date: "2019-11-17T20:39:05:211Z"
        },
        {
            _id: 2,
            name: 'Tarea privada 2',
            description: "Descripcion privada 2",
            date: "2019-11-17T20:39:05:211Z"
        },
        {
            _id: 3,
            name: 'Tarea privada 3',
            description: "Descripcion privada 3",
            date: "2019-11-17T20:39:05:211Z"
        },
        {
            _id: 4,
            name: 'Tarea privada 4',
            description: "Descripcion privada 4",
            date: "2019-11-17T20:39:05:211Z"
        }
    ])
})

router.post('/perfil', verificarToken, (req, res) => {
    res.send(req.userId);
})

module.exports = router;

function verificarToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('No autorizado')
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('No autorizado')
    }

    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;
    next();
}