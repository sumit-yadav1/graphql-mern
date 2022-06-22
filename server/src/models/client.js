import mongoose from "mongoose";

const { Schema, model } = mongoose;

const clientScehma = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
});

export const Client = model("Client", clientScehma);
