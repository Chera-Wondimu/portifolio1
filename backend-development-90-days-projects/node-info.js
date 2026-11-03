console.log("=== NODE.JS INFORMATION ===");

console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("Current directory:", process.cwd());

console.log("\n=== ENVIRONMENT ===");

console.log("APP_NAME:", process.env.APP_NAME);

console.log("\n=== RUNTIME CHECK ===");

console.log("process:", typeof process);
console.log("window:", typeof window);
console.log("document:", typeof document);