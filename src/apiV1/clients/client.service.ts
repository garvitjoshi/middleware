import * as bcrypt from "bcrypt";

import Client from "./client.model";
import config from "../../config/config";

export default class ClientService {
  public insert = async (req, res, data): Promise<any> => {
    try {
      const { name, client_id, client_secret } = data;

      const hash = await bcrypt.hash(client_secret, config.ENCRYPTION_SALT);
      const client = new Client({
        name,
        client_id,
        client_secret: hash
      });
      const result = await client.save();
      return result;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findAll = async (req, res): Promise<any> => {
    try {
      const clients = await Client.find();
      return clients;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOneByClientId = async (req, res, client_id): Promise<any> => {
    try {
      const client = await Client.find({ client_id });
      return client;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req, res, client_id, data): Promise<any> => {
    try {
      const clientUpdated = await Client.updateOne(
        {
          client_id
        },
        {
          $set: data
        }
      );
      return clientUpdated;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  // public remove = async (req, res): Promise<any> => {
  //   try {
  //     const client = await Client.findByIdAndRemove(req.params.client_id);
  //     return client;
  //   } catch (err) {
  //     res.status(500).send({
  //       success: false,
  //       message: err.toString(),
  //       data: null
  //     });
  //   }
  // };
}
