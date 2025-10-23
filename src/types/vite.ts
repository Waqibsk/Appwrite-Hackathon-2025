interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
