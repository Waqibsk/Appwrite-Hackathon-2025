interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_DATABASE_ID: string;
  readonly VITE_USER_COLLECTIONS_ID: string;
  readonly VITE_SPACES_COLLECTIONS_ID: string;
  readonly VITE_ITEMS_COLLECTIONS_ID: string;
  readonly VITE_BUCKET_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
