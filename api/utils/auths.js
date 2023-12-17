// eslint-disable-next-line import/no-unresolved
const verifyAzureToken = require('azure-ad-jwt-lite');

const jwtVerificationMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  token = token.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }

  try {
    const decoded = await verifyAzureToken.verifyAzureToken(token, { useCache: false });
    req.user = decoded;
   await next();
  } catch (error) {
    console.error('Erreur dans azure-ad-jwt-lite:', error);
    return res.status(401).json({ error: 'Token invalide' });
  }
};

// Middleware de vérification du jeton appliqué à toutes les routes suivantes
module.exports = { jwtVerificationMiddleware };
