import { Client } from "../models/client.js";
import { clients } from "../utils/sampleData.js";

export const getAllClients = async () => {
  const clients = await Client.find({}).exec();

  return clients;
};

export const getClient = async (id) => {
  const client = await Client.findById(id);
  if (!client) {
    return "not found";
  }

  return client;
};
