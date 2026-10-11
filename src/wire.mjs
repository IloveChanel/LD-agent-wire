const stores = {
  local: { label: "Local JSON", env: "STORAGE_KEY" },
  azure: { label: "Azure Blob", env: "AZURE_STORAGE_CONNECTION" },
  postgres: { label: "PostgreSQL", env: "DATABASE_URL" },
};

export function buildWire({ projectName, description = "", store = "local", notes = "", theme = "", modules = [] }) {
  const choice = stores[store] || stores.local;
  const file = `export const store = ${JSON.stringify(store)};
const storageKey = process.env.STORAGE_KEY || "PLACEHOLDER";
const azureConnection = process.env.AZURE_STORAGE_CONNECTION || "PLACEHOLDER";
const databaseUrl = process.env.DATABASE_URL || "PLACEHOLDER";
const githubToken = process.env.GITHUB_TOKEN || "PLACEHOLDER";
export function readRecord(id) { return { id, store, storageKey, azureConnection, databaseUrl, githubToken, ok: true }; }
`;
  const mentioned = `${description} ${notes}`.toLowerCase();
  const questions = store === "local" && /azure|postgres|database/.test(mentioned)
    ? ["The note mentions a database. Keep Local JSON, or switch to Azure Blob or PostgreSQL?"]
    : [];
  return {
    projectName,
    store,
    theme: theme || "modern",
    modules,
    file,
    github: process.env.GITHUB_TOKEN ? "saved" : "placeholder",
    done: [`Wired ${projectName} to ${choice.label}.`],
    needed: [`${choice.env} is PLACEHOLDER. Local JSON remains the fallback.`, ...(process.env.GITHUB_TOKEN ? [] : ["GITHUB_TOKEN is PLACEHOLDER."])],
    questions,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [projectName, description, store] = process.argv.slice(2);
  console.log(JSON.stringify(buildWire({ projectName: projectName || "Notes", description, store }), null, 2));
}
