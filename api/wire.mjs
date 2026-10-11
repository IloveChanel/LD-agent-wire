import { buildWire } from "../src/wire.mjs";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const projectName = String(body.projectName || "").trim();
  if (!projectName) return Response.json({ ok: false, error: "Project name is required." });
  return Response.json({ ok: true, ...buildWire(body) });
}
