import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import pkgJson from "./package.json";
import tsConfig from "./tsconfig.json";

const dist = "dist";
const name = "VueChartjsComponent";
const globals = { "vue-demi": "VueDemi" };

const baseConfig = {
  input: "src/index.ts",
  external: [
    ...Object.keys(pkgJson.peerDependencies),
    ...Object.keys(pkgJson.dependencies),
  ],
  plugins: [
    esbuild({
      target: tsConfig.compilerOptions.target,
      minify: true,
    }),
  ],
};

export default [
  {
    input: baseConfig.input,
    output: {
      file: dist + "/index.d.ts",
    },
    plugins: [dts()],
  },
  {
    ...baseConfig,
    output: {
      file: dist + "/index.esm.js",
      format: "esm",
    },
  },
  {
    ...baseConfig,
    output: {
      name,
      globals,
      file: dist + "/index.umd.js",
      format: "umd",
      exports: "default",
      compact: true,
    },
  },
  {
    ...baseConfig,
    output: {
      name,
      globals,
      file: dist + "/index.min.js",
      format: "iife",
      exports: "default",
      compact: true,
    },
  },
];
