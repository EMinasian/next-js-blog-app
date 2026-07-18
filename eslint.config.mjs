import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [{ ignores: ["coverage/**"] }, ...nextCoreWebVitals];

export default eslintConfig;
