import * as bcrypt from "bcrypt";
import * as qs from "qs";

import Client from "./client.model";
import config from "../../config/config";

export default class clientService {
  public insert = async (req, res, data): Promise<any> => {
    try {
      const { name, client_id, client_secret } = data;

      const hash = await bcrypt.hash(client_secret, config.SALT_ROUNDS);
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

  public findOne = async (req, res): Promise<any> => {
    try {
      const client = await Client.find({ client_id: req.params.id });
      return client;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req, res, data): Promise<any> => {
    try {
      const clientUpdated = await Client.updateOne(
        {
          client_id: res.locals.client_id
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

  public remove = async (req, res): Promise<any> => {
    try {
      const client = await Client.findByIdAndRemove(req.params.id);
      return client;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
