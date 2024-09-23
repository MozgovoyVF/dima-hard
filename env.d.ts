declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    SITE_URL: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    NEXT_PUBLIC_FATSECRET_CLIENT_ID: string;
    NEXT_PUBLIC_FATSECRET_CLIENT_SECRET: string;
  }
}
