import { execSync } from "child_process";
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { copy } from "fs-extra";
import { resolve } from "path";
import archiver from "archiver";
import fs from "fs";

// Paths
const projectRoot = process.cwd();
const outputDir = resolve(projectRoot, "VRA-prod");
const zipFile = resolve(projectRoot, "VRA-prod.zip");

console.log("✅ Starting production build...");

// 1️⃣ Build Next.js production
execSync("npm install", { stdio: "inherit" });
execSync("npm run build", { stdio: "inherit" });

// 2️⃣ Prepare production folder
if (existsSync(outputDir)) {
    execSync(`rm -rf ${outputDir}`);
}
mkdirSync(outputDir);

// Copy necessary folders
console.log("📁 Copying .next and public folders...");
await copy(resolve(projectRoot, ".next"), resolve(outputDir, ".next"));
await copy(resolve(projectRoot, "public"), resolve(outputDir, "public"));

// Copy package files
copyFileSync(resolve(projectRoot, "package.json"), resolve(outputDir, "package.json"));
if (existsSync(resolve(projectRoot, "package-lock.json"))) {
    copyFileSync(resolve(projectRoot, "package-lock.json"), resolve(outputDir, "package-lock.json"));
}

// 3️⃣ Zip the production folder
console.log("🗜️ Zipping production folder...");
const output = fs.createWriteStream(zipFile);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(outputDir, false);
await archive.finalize();

console.log(`✅ Production zip ready: ${zipFile}`);
