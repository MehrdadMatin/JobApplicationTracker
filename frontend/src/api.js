// frontend/src/api.js
import axios from "axios";

// Using Vite proxy: '/api' -> Django :8000
export const api = axios.create({ baseURL: "/api" });

/** Applications */
export const listApplications = (params = {}) =>
  api.get("/applications/", { params });

/** Master Resume (we store exactly one) */
export const listMasterResume = () =>
  api.get("/resume/"); // returns an array, at most 1 item

export const uploadMasterResume = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  // POST /api/resume/ replaces existing master (per your backend)
  return api.post("/resume/", fd);
};

/** Tailored resume per application (FileField on JobApplication) */
export const uploadTailoredResumeForApp = (appId, file) => {
  const fd = new FormData();
  fd.append("tailored_resume", file);
  // PATCH multipart to update only the file
  return api.patch(`/applications/${appId}/`, fd);
};
