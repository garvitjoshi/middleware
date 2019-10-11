import { Request, Response } from "express";

import ClientService from "../clients/client.service";
import SnowService from "./snow.service";

const snowService = new SnowService();
const clientService = new ClientService();


export default class SnowController {

  private api_access = false;

  public openCase = async (req: Request, res: Response): Promise<any> => {
    try {
      await this.checkApiAccess(req, res);

      if (this.api_access === true) {
        const data = this.openCaseValidation(req, res);
        const result = await snowService.openCase(req, res, data);
        res.status(200).send({
          success: true,
          data: result
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

  public closeCase = async (req: Request, res: Response): Promise<any> => {
    try {
      await this.checkApiAccess(req, res);

      if (this.api_access === true) {
        const data = this.closeCaseValidation(req, res, '');
        const result = await snowService.closeCase(req, res, data);
        res.status(200).send({
          success: true,
          data: result
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

  public openCloseCase = async (req: Request, res: Response): Promise<any> => {
    try {
      await this.checkApiAccess(req, res);

      if (this.api_access === true) {
        const data = this.openCaseValidation(req, res);
        const caseResult = await snowService.openCase(req, res, data);

        const caseNo = caseResult.result[0].display_value;

        const data1 = this.closeCaseValidation(req, res, caseNo);
        const result = await snowService.closeCase(req, res, data1);

        res.status(200).send({
          success: true,
          data: result
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

  private openCaseValidation = (req: Request, res: Response) => {
    let data = {};
    let empty_data = {};

    // "3"
    if (req.body.u_priority) {
      data["u_priority"] = req.body.u_priority
    } else {
      empty_data['u_priority'] = '';
    }

    // user Ldap
    if (req.body.u_caller) {
      data["u_caller"] = req.body.u_caller
    } else {
      empty_data['u_caller'] = '';
    }

    // "Conferencing Ops"
    if (req.body.u_assignment_group) {
      data["u_assignment_group"] = req.body.u_assignment_group
    } else {
      empty_data['u_assignment_group'] = '';
    }

    if (req.body.u_assigned_to) {
      data["u_assigned_to"] = req.body.u_assigned_to
    } else {
      empty_data['u_assigned_to'] = '';
    }

    // "Notify/Alert"
    if (req.body.u_category) {
      data["u_category"] = req.body.u_category
    } else {
      empty_data['u_category'] = '';
    }

    // "Threshold Exceeded"
    if (req.body.u_subcategory) {
      data["u_subcategory"] = req.body.u_subcategory
    } else {
      empty_data['u_subcategory'] = '';
    }

    // "Break/Fix"
    if (req.body.u_case_type) {
      data["u_case_type"] = req.body.u_case_type
    } else {
      empty_data['u_case_type'] = '';
    }

    // "monitor"
    if (req.body.u_contact_type) {
      data["u_contact_type"] = req.body.u_contact_type
    } else {
      empty_data['u_contact_type'] = '';
    }

    if (req.body.u_business_service) {
      data["u_business_service"] = req.body.u_business_service
    } else {
      empty_data['u_business_service'] = '';
    }

    // "BlueJeans"
    if (req.body.u_configuration_item) {
      data["u_configuration_item"] = req.body.u_configuration_item
    } else {
      empty_data['u_configuration_item'] = '';
    }

    // "BlueJeans feedback received"
    if (req.body.u_short_description) {
      data["u_short_description"] = req.body.u_short_description
    } else {
      empty_data['u_short_description'] = '';
    }

    // "Negative feedback received for 1234 BlueJeans meetings last week"
    if (req.body.u_description) {
      data["u_description"] = req.body.u_description
    } else {
      empty_data['u_description'] = '';
    }

    if (req.body.u_work_notes) {
      data["u_work_notes"] = req.body.u_work_notes
    } else {
      empty_data['u_work_notes'] = '';
    }

    if (req.body.u_resolution_notes) {
      data["u_resolution_notes"] = req.body.u_resolution_notes
    } else {
      empty_data['u_resolution_notes'] = '';
    }

    if (req.body.u_case_categorization) {
      data["u_case_categorization"] = req.body.u_case_categorization
    } else {
      // empty_data['u_case_categorization'] = '';
      data["u_case_categorization"] = '';
    }

    if (req.body.state) {
      data["state"] = req.body.state
    } else {
      empty_data['state'] = '';
    }

    if (req.body.u_complexity) {
      data["u_complexity"] = req.body.u_complexity
    } else {
      empty_data['u_complexity'] = '';
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

  private closeCaseValidation = (req: Request, res: Response, caseNo: any) => {

    let data = {}
    let empty_data = {};

    // case no.
    if (caseNo) {
      data["u_number"] = caseNo
    } else if (req.body.u_number || caseNo) {
      data["u_number"] = req.body.u_number
    } else {
      empty_data['u_number'] = '';
    }

    // "Resolved"
    if (req.body.state) {
      data["state"] = req.body.state
    } else {
      empty_data['state'] = '';
    }

    // close_notes
    if (req.body.u_resolution_notes) {
      data["u_resolution_notes"] = req.body.u_resolution_notes
    } else {
      empty_data['u_resolution_notes'] = '';
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

  private checkApiAccess = async (req, res): Promise<any> => {
    let client_id = '';
    this.api_access = false;
    if (req.headers.client_id) {
      client_id = req.headers.client_id
    } else {
      res.status(200).send({
        success: false,
        message: "Clent Id can not be empty",
      });
    }
    const client = await clientService.findOneByClientId(req, res, client_id)
    if (!client) {
      res.status(200).send({
        success: false,
        message: "Clent not found in database",
      });
    }
    if (client[0]['apis_access']) {
      const apis_access = client[0].apis_access;
      apis_access.forEach(e => {
        if (e.api_name == 'snow') {
          this.api_access = true;
        }
      });
    }
    if (this.api_access === false) {
      res.status(200).send({
        success: false,
        message: "You don't have api access contact administrator"
      });
    }
  }
}
