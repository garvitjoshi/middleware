import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-then';

import { Request, Response } from 'express';

import Clients from '../clients/client.model';
import config from '../../config/config';

export default class AuthController {
  public authenticate = async (req: Request, res: Response): Promise<any> => {
    const { client_id, client_secret } = req.body;
    try {
      const client = await Clients.findOne({ client_id: req.body.client_id });
      if (!client) {
        return res.status(404).send({
          success: false,
          message: 'Client not found'
        });
      }

      const matchPasswords = await bcrypt.compare(client_secret, client.client_secret);
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: 'Not authorized'
        });
      }

      const token = await jwt.sign({ client_id }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION
      });

      res.status(200).send({
        success: true,
        message: 'Token generated Successfully',
        data: {
          "token":token
        }
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };


}
