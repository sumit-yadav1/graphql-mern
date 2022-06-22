import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const projectScehma = new Schema({
  clientId: {
    type: Types.ObjectId,
    ref: "Client",
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Not Started", "Not Started", "Completed"],
  },
});

export const Project = model("Project", projectScehma);
