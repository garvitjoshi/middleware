import * as jwt from 'jwt-then';

import ClientService from "../apiV1/clients/client.service";
import config from '../config/config';

const clientService = new ClientService();

const verifyToken = async (req, res, next): Promise<any> => {
  // check header or url parameters or post parameters for token

  if ((typeof req.headers.client_id !== 'string') && (!req.headers.client_id)) {
    return res.status(400).send({ auth: false, message: 'No client_id provided.' });
  }

  if (typeof req.headers.authorization !== 'string') {
    return res.status(400).send({ auth: false, message: 'No authorization provided.' });
  }

  const token: string = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  try {
    // Check Client is exist or not.
    const client_id = req.headers.client_id;
    const client = await clientService.findOneByClientId(req, res, client_id);
    if (!client.length) {
      return res.status(403).send({ auth: false, message: 'client_id not found in database.' });
    }

    // verifies secret and checks token expiry
    const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);

    if(decoded.client_id == client_id){
      res.locals.client_id = decoded.client_id;
      console.log(res.locals.client_id);
      next();
    }else{
      return res.status(403).send({ auth: false, message: 'Token is not match with the client_id' });
    }
  } catch (err) {
    res.status(500).send({ auth: false, message: err });
  }
};

export default verifyToken;
