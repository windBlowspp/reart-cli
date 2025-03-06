import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // 可以根据需要修改开发服务器的端口号
    },
    resolve: {
        alias: {
            "@": "/src", // 简化路径别名
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 支持全局变量或 Mixins]
            },
        },
    },
    esbuild: {
        loader: "jsx", // 默认情况下，将所有 jsx 文件识别为 JSX
    },
});
