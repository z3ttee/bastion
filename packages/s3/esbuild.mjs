import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/**/*"],
  bundle: false,
  minify: false,
  format: "esm",
  target: "es6",
  minifyWhitespace: false,
  outdir: "dist/esm",
  treeShaking: true,
  tsconfig: "tsconfig.json",
  platform: "node"
});

await esbuild.build({
  entryPoints: ["src/**/*"],
  bundle: false,
  minify: false,
  format: "cjs",
  target: "es6",
  minifyWhitespace: false,
  outdir: "dist/cjs",
  treeShaking: true,
  tsconfig: "tsconfig.json",
  platform: "node"
});
