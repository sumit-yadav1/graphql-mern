import { Project } from "../models/project.js";

export const getAllProjects = async () => {
  const projects = await Project.find({}).populate("client").exec();
  return projects;
};

export const getProject = async (id) => {
  const project = await Project.findById(id).populate("client").exec();
  if (!project) {
    return "error found";
  }
  return project;
};
