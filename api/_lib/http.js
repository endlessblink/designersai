export const json = (res, status, body, headers = {}) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  res.end(JSON.stringify(body));
};

export const methodNotAllowed = (res) => json(res, 405, { error: "Method not allowed" });

export const readBody = async (req) => {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

export const cmsUnavailable = (res) =>
  json(res, 503, {
    error: "CMS backend is not configured",
    missing: ["DATABASE_URL"],
  });
