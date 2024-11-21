import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3300,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
			"@assets": `${path.resolve(__dirname, "./src/assets/")}`,
			"@@types": `${path.resolve(__dirname, "../common/types")}`,
			"@components": `${path.resolve(__dirname, "./src/components/")}`,
			"@contexts": `${path.resolve(__dirname, "./src/contexts/")}`,
			"@pages": `${path.resolve(__dirname, "./src/pages")}`,
			"@shared": `${path.resolve(__dirname, "./src/shared/")}`,
		},
	},
});
