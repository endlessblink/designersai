import { getSession } from "../_lib/auth.js";
import { json } from "../_lib/http.js";

export default async function handler(req, res) {
  return json(res, 200, { user: getSession(req) });
}
