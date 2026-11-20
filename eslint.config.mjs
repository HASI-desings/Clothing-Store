import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: [".next/**", "node_modules/**", "design/**", "test-results/**", "playwright-report/**"] },
];

export default config;
