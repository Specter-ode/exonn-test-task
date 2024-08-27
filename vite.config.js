import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), svgr(), tsconfigPaths()],
	base: '/exonn-test-task/', // замените 'название-репозитория' на имя вашего репозитория на GitHub
	build: {
		outDir: 'dist',
	},
});
