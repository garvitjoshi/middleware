import * as bcrypt from "bcrypt";

import { Request, Response } from "express";

import ClientService from "./client.service";
import config from "../../config/config";

const clientService = new ClientService();

export default class ClientController {
  public register = async (req: Request, res: Response): Promise<any> => {
    const { name, client_id, client_secret } = req.body;
    try {
      const data = { name, client_id, client_secret };
      const result = await clientService.insert(req, res, data);
      res.status(201).send({
        success: true,
        message: "Client Successfully created",
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };

  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const clients = await clientService.findAll(req, res);
      res.status(200).send({
        success: true,
        data: clients
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const client = await clientService.findOne(req, res);
      res.status(200).send({
        success: true,
        data: client
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    try {
      let changes = {};

      if (req.body.name) {
        changes["name"] = req.body.name;
      }

      if (req.body.client_id) {
        changes["client_id"] = req.body.client_id;
      }

      if (req.body.client_secret) {
        const hash = await bcrypt.hash(
          req.body.client_secret,
          config.SALT_ROUNDS
        );
        changes["client_secret"] = hash;
      }

      if (req.body.apis_access) {
        changes["apis_access"] = req.body.apis_access;
      }

      const clientUpdated = await clientService.update(req, res, changes);

      if (!clientUpdated) {
        return res.status(404).send({
          success: false,
          message: "Client not found",
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: clientUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {

      const client = await clientService.remove(req, res);
      if (!client) {
        return res.status(404).send({
          success: false,
          message: "Client not found",
          data: null
        });
      } else {
        return res.status(204).send({
          success: true,
          message: "Client removed successfully",
          data: null
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
