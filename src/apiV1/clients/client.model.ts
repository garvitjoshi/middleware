import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const ClientSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    client_id: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    client_secret: {
      type: String,
      required: true,
      trim: true
    },
    apis_access:{
      type: Object
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("Client", ClientSchema);
