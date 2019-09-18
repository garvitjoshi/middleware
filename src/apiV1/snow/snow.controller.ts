import { Request, Response } from "express";

import SnowService from "./snow.service";
import config from "../../config/config";

const snowService = new SnowService();

export default class SnowController {

  public openCase = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = {
        u_caller: req.body.u_caller, // user Ldap
        u_short_description: req.body.u_short_description, // "BlueJeans feedback received"
        u_assignment_group: req.body.u_assignment_group, // "Conferencing Ops"
        u_description: req.body.u_description, // "Negative feedback received for " + count + " BlueJeans meetings last week"
        u_category: req.body.u_category, // "Notify/Alert"
        u_subcategory: req.body.u_subcategory, // "Threshold Exceeded"
        u_configuration_item: req.body.u_configuration_item, // "BlueJeans"
        u_contact_type: req.body.u_contact_type, // "monitor"
        u_case_type: req.body.u_case_type, // "Break/Fix"
        u_priority: req.body.u_priority // "3"
      };

      const result = await snowService.openCase(req, res, data);

      res.status(200).send({
        success: true,
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public closeCase = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = {
        u_number: req.body.u_number, // case no.
        u_state: req.body.u_state, // "Resolved"
        u_resolution_notes: req.body.u_resolution_notes // close_notes
      };

      const result = await snowService.closeCase(req, res, data);

      res.status(200).send({
        success: true,
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };


  public openCloseCase = async (req: Request, res: Response): Promise<any> => {
    try {
      const data = {
        u_caller: req.body.u_caller, // user Ldap
        u_short_description: req.body.u_short_description, // "BlueJeans feedback received"
        u_assignment_group: req.body.u_assignment_group, // "Conferencing Ops"
        u_description: req.body.u_description, // "Negative feedback received for " + count + " BlueJeans meetings last week"
        u_category: req.body.u_category, // "Notify/Alert"
        u_subcategory: req.body.u_subcategory, // "Threshold Exceeded"
        u_configuration_item: req.body.u_configuration_item, // "BlueJeans"
        u_contact_type: req.body.u_contact_type, // "monitor"
        u_case_type: req.body.u_case_type, // "Break/Fix"
        u_priority: req.body.u_priority // "3"
      };
      const caseResult = await snowService.openCase(req, res, data);

      const caseNo = caseResult.result[0].display_value;

      const data1 = {
        u_number: caseNo, // case no.
        u_state: req.body.u_state, // "Resolved"
        u_resolution_notes: req.body.u_resolution_notes // close_notes
      };
      const result = await snowService.closeCase(req, res, data1);

      res.status(200).send({
        success: true,
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
