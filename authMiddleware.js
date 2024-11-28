const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para proteger rotas que exigem autenticação
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login'); // Redireciona se não estiver autenticado
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.redirect('/login'); // Redireciona se o token for inválido
    req.user = user; // Anexa o usuário ao objeto req
    next();
  });
}

// Middleware para redirecionar usuários autenticados
function redirectIfAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (!err && user) {
        return res.redirect('/products'); // Redireciona para /products se autenticado
      }
      next(); // Prossegue se o token for inválido ou expirado
    });
  } else {
    next(); // Prossegue se não houver token
  }
}

module.exports = { authenticateToken, redirectIfAuthenticated };
