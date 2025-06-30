import js from "@eslint/js"
import globals from "globals"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ignores: ["node_modules/", "dist/", "build/", "client/dist/", "coverage/"],
    plugins: { js },
    rules: {
      "no-unused-vars": "off",
    },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      "react/prop-types": "off",
    },
  },
  eslintPluginPrettierRecommended,
])
