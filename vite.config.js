import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Firebase Hosting はルート（https://<project>.web.app/）で配信するため base は "/"。
// ※ GitHub Pages のプロジェクトページ（/<repo>/ 配下）に戻す場合は base を "/eiken-trainer/" にする。
export default defineConfig({
  plugins: [react()],
  base: "/",
});
