const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const { authenticateToken, redirectIfAuthenticated } = require('./authMiddleware');

// Carregar variáveis de ambiente
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para verificar se o usuário está autenticado
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (!err) {
        req.user = user;
        res.locals.user = user;
      } else {
        req.user = null;
        res.locals.user = null;
      }
      next();
    });
  } else {
    req.user = null;
    res.locals.path = req.path;
    res.locals.user = null;
    next();
  }
});



// Home Route
app.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/products');
  } else {
    res.redirect('/login');
  }
});

// Register Routes
app.get('/register', redirectIfAuthenticated, (req, res) => {
    res.render('register', { title: 'Register', error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, hashedPassword],
    function (err) {
      if (err) {
        return res.render('register', {
          title: 'Register',
          error: 'Username already exists!',
        });
      }
      res.redirect('/login');
    }
  );
});

// Login Routes
app.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { title: 'Login', error: null });
});

app.post('/login', redirectIfAuthenticated, async (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) {
      return res.render('login', {
        title: 'Login',
        error: 'Invalid credentials!',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', {
        title: 'Login',
        error: 'Invalid credentials!',
      });
    }

    // Create tokens
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '7d',
    });

    // Store tokens in cookies
    res.cookie('token', token);
    res.cookie('refreshToken', refreshToken);
    res.cookie('username', user.username);

    // Redirect to products
    res.redirect('/products');
  });
});

// Logout Route
app.get('/logout', authenticateToken, (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
    res.clearCookie('username');
  res.redirect('/login');
});

// Add Product Routes
app.get('/add-product', authenticateToken, (req, res) => {
  res.render('add-product', { title: 'Add Product', error: null });
});

app.post('/add-product', authenticateToken, (req, res) => {
  const { name, price, image, description, tags } = req.body;
  const userId = req.user.id;

  db.run(
    `INSERT INTO products (user_id, name, price, image, description, tags) VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, name, price, image, description, tags],
    function (err) {
      if (err) {
        return res.render('add-product', {
          title: 'Add Product',
          error: 'Error adding product!',
        });
      }
      res.redirect('/products');
    }
  );
});

// List Products Route
app.get('/products', authenticateToken, (req, res) => {
  db.all(`SELECT id, name, price, image, tags FROM products`, [], (err, products) => {
    if (err) {
      return res.render('products', {
        title: 'Products',
        error: 'Error fetching products!',
      });
    }
    res.render('products', { title: 'Products', products });
  });
});

// Search Products Route
app.get('/search', authenticateToken, (req, res) => {
  const { q } = req.query;
  db.all(
    `SELECT id, name, price, image, tags FROM products WHERE name LIKE ? OR tags LIKE ?`,
    [`%${q}%`, `%${q}%`],
    (err, products) => {
      if (err) {
        return res.render('products', {
          title: 'Search Results',
          error: 'Error searching products!',
        });
      }
      res.render('products', { title: 'Search Results', products });
    }
  );
});

// Individual Product View Route
app.get('/product/:id', authenticateToken, (req, res) => {
  const productId = req.params.id;

  db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, product) => {
    if (err || !product) {
      return res.render('product', {
        title: 'Product',
        error: 'Product not found!',
      });
    }
    res.render('product', { title: product.name, product });
  });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
