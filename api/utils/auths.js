// eslint-disable-next-line import/no-unresolved
const verifyAzureToken=require('azure-ad-jwt-lite')


const jwtVerificationMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  // npm stoken = token.replace('Bearer ', '');
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }

  try {
    const decoded = await  verifyAzureToken.verifyAzureToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Token invalide' });
  }
};

// Middleware de vérification du jeton appliqué à toutes les routes suivantes

module.exports = { jwtVerificationMiddleware };