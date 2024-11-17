const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/main.ts"], // Replace with your main TypeScript file
    bundle: true, // Bundle dependencies into a single file
    platform: "node", // Target Node.js environment
    target: "node20", // Specify your Node.js version
    outfile: "../release/main.js", // Output file
    loader: { ".ts": "ts" }, // Add support for TypeScript
    sourcemap: true, // Optional: Generate source maps
    minify: false, // Optional: Minify the output for production
  })
  .then(() => {
    console.log("Build succeeded!");
  })
  .catch(() => process.exit(1));
