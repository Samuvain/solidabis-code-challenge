This project was done by Samuvain just for fun.

Fetching data from cloud function just to get around cors.
```
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const axios = require('axios');

const SECRET_URL = "https://koodihaaste-api.solidabis.com/secret";

exports.findBullshit = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  } 
  
  const { bullshitUrl, jwtToken } = await axios
    .get(SECRET_URL)
    .then(resp => {
      return resp.data;
    });

  const bullshits = await axios
    .get(bullshitUrl, {
      headers: {
        Authorization: jwtToken
      }
    })
    .then(resp => {
      return resp.data;
    });
  
  
  res.status(200).send(bullshits);
};
```
