import { getAllClients, getClient } from "../../controllers/client.js";
import { getAllProjects, getProject } from "../../controllers/project.js";
import { clients, projects } from "../../utils/sampleData.js";

export const queryResolvers = {
  Query: {
    getValue: () => "your name",
    getClient: async (_, { id }) => {
      return getClient(id);
    },
    getAllClients: async () => {
      return getAllClients();
    },

    getProject: async (_, { id }) => {
      return getProject(id);
    },
    getAllProjects: (_) => {
      return getAllProjects();
    },
  },
};
