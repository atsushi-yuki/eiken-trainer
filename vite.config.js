import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages のプロジェクトページは https://<user>.github.io/<repo>/ で配信されるため、
// base にリポジトリ名を指定する必要がある。リポジトリ名を変える場合はここも変更する。
export default defineConfig({
  plugins: [react()],
  base: "/eiken-trainer/",
});
