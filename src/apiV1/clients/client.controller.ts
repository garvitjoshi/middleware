import * as bcrypt from "bcrypt";

import { Request, Response } from "express";

import ClientService from "./client.service";
import config from "../../config/config";

const clientService = new ClientService();

export default class ClientController {
  public register = async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.headers.token) {
        return res.status(403).send({ auth: false, message: 'Admin token is not provided in header.' });
      }
      if (Number(req.headers.token) == config.ADMIN_CLIENT_TOKEN) {
        const data = this.registerValidation(req, res);
        const result = await clientService.insert(req, res, data);
        res.status(201).send({
          success: true,
          message: "Client Successfully created",
          data: result
        });
      } else {
        return res.status(403).send({ auth: false, message: 'Invalid admin token in header.' });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };

  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.headers.token) {
        return res.status(403).send({ auth: false, message: 'Admin token is not provided in header.' });
      }
      if (Number(req.headers.token) == config.ADMIN_CLIENT_TOKEN) {
        const clients = await clientService.findAll(req, res);
        res.status(200).send({
          success: true,
          data: clients
        });
      } else {
        return res.status(403).send({ auth: false, message: 'Invalid admin token in header.' });
      }
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
      if (!req.headers.token) {
        return res.status(403).send({ auth: false, message: 'Admin token is not provided in header.' });
      }
      if (Number(req.headers.token) == config.ADMIN_CLIENT_TOKEN) {
        let client_id = '';
        if (req.params.client_id) {
          client_id = req.params.client_id
        } else {
          res.status(200).send({
            success: false,
            message: "Client Id can not be empty in parameters",
          });
        }
        const client = await clientService.findOneByClientId(req, res, client_id);

        if (!client.length) {
          return res.status(403).send({ auth: false, message: 'client_id is not found in database.' });
        }
        res.status(200).send({
          success: true,
          data: client
        });
      } else {
        return res.status(403).send({ auth: false, message: 'Invalid admin token in header.' });
      }
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
      if (!req.headers.token) {
        return res.status(403).send({ auth: false, message: 'Admin token is not provided in header.' });
      }

      let client_id = '';
      if (req.params.client_id) {
        client_id = req.params.client_id
      } else {
        res.status(202).send({
          success: false,
          message: "Client Id can not be empty in parameters",
        });
      }
      const client = await clientService.findOneByClientId(req, res, client_id);
      if (!client.length) {
        return res.status(403).send({ auth: false, message: 'client_id is not found in database.' });
      }

      if (Number(req.headers.token) == config.ADMIN_CLIENT_TOKEN) {

        let changes = {};

        if (req.body.name) {
          changes["name"] = req.body.name;
        }

        if (req.body.client_secret) {
          const hash = await bcrypt.hash(
            req.body.client_secret,
            config.ENCRYPTION_SALT
          );
          changes["client_secret"] = hash;
        }

        if (req.body.apis_access) {
          changes["apis_access"] = req.body.apis_access;
        }

        const clientUpdated = await clientService.update(req, res, client_id, changes);

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
      } else {
        return res.status(403).send({ auth: false, message: 'Invalid admin token in header.' });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  // public remove = async (req: Request, res: Response): Promise<any> => {
  //   try {
  //     const client = await clientService.remove(req, res);
  //     if (!client) {
  //       return res.status(404).send({
  //         success: false,
  //         message: "Client not found",
  //         data: null
  //       });
  //     } else {
  //       return res.status(204).send({
  //         success: true,
  //         message: "Client removed successfully",
  //         data: null
  //       });
  //     }
  //   } catch (err) {
  //     res.status(500).send({
  //       success: false,
  //       message: err.toString(),
  //       data: null
  //     });
  //   }
  // };

  private registerValidation(req, res) {
    let data = {}
    let empty_data = {};

    if (req.body.name) {
      data["name"] = req.body.name
    } else {
      empty_data['name'] = '';
    }

    // "Resolved"
    if (req.body.client_id) {
      data["client_id"] = req.body.client_id
    } else {
      empty_data['client_id'] = '';
    }

    // close_notes
    if (req.body.client_secret) {
      data["client_secret"] = req.body.client_secret
    } else {
      empty_data['client_secret'] = '';
    }

    if (Object.keys(empty_data).length !== 0) {
      res.status(200).send({
        success: false,
        message: "data can not be empty",
        data: empty_data
      });
    }

    return data;
  }
}
