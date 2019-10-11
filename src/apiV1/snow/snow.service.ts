import * as qs from "qs";

import axios from "axios";
import config from "../../config/config";

export default class SnowService {
  public openCase = async (req, res, data): Promise<any> => {
    try {
      const params = {
        u_priority: data.u_priority,
        u_caller: data.u_caller,
        u_assignment_group: data.u_assignment_group,
        u_assigned_to: data.u_assigned_to,
        u_category: data.u_category,
        u_subcategory: data.u_subcategory,
        u_case_type: data.u_case_type,
        u_contact_type: data.u_contact_type,
        u_business_service: data.u_business_service,
        u_configuration_item: data.u_configuration_item,
        u_short_description: data.u_short_description,
        u_description: data.u_description,
        u_work_notes: data.u_work_notes,
        u_resolution_notes: data.u_resolution_notes,
        u_case_categorization: data.u_case_categorization,
        state: data.state,
        u_complexity: data.u_complexity
      };

      const options = {
        headers: {
          "Content-Type": "application/json",
          api_key: config.SNOW_API_KEY,
          Authorization: await this.checkAuthToken(req, res)
        }
      };

      const result = await axios.post(
        `${config.SNOW_URL}/post_snow_data?tableName=u_rest_case_create`,
        params,
        options
      );

      return result.data;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public closeCase = async (req, res, data): Promise<any> => {
    try {
      const params = {
        u_number: data.u_number,
        state: data.state,
        u_resolution_notes: data.u_resolution_notes
      };

      const options = {
        headers: {
          "Content-Type": "application/json",
          api_key: config.SNOW_API_KEY,
          Authorization: await this.checkAuthToken(req, res)
        }
      };

      const result = await axios.post(
        `${config.SNOW_URL}/post_snow_data?tableName=u_rest_case_modify`,
        params,
        options
      );

      return result.data;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  private generateAuthCode = async (req, res): Promise<any> => {
    try {
      const params = {
        grant_type: config.SNOW_GRANT_TYPE,
        client_id: config.SNOW_CLIENT_ID,
        client_secret: config.SNOW_CLIENT_SECRET,
        username: config.SNOW_USERNAME,
        password: config.SNOW_PASSWORD
      };

      const options = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          api_key: config.SNOW_API_KEY
        }
      };

      const result = await axios.post(
        `${config.SNOW_URL}/get_snow_token`,
        qs.stringify(params),
        options
      );

      return result.data;
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  private checkAuthToken = async (req, res): Promise<any> => {
    try {
      if (req.session.snow) {
        if (req.session.snow.access_token) {
          return req.session.snow.access_token;
        } else {
          const result = await this.generateAuthCode(req, res);
          req.session.snow = { access_token: result.access_token };
          return result.access_token;
        }
      } else {
        const result = await this.generateAuthCode(req, res);
        req.session.snow = { access_token: result.access_token };
        // console.log(result.access_token);
        return result.access_token;
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
