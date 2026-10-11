# Wiring

Fifth agent for Logically Done. Open this folder in Visual Studio Code or Visual Studio.

The box has three storage buttons:

- Local JSON, already selected. No account is required.
- Azure Blob
- PostgreSQL

The live page calls `/api/owner/logically-done/wire`. Missing keys stay `process.env.STORAGE_KEY || "PLACEHOLDER"`. If `GITHUB_TOKEN` is missing, the result stays JSON and the file is still saved on the project and in the library.

```text
npm start -- "Notes" "A web notes dashboard" local
```
