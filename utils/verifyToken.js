import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const verifyToken = async (bearerToken) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });

  const getJwksClientKey = (header, callback) => {
    client.getSigningKey(header.kid, (error, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.API_IDENTIFIER,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  })

};

export default verifyToken;