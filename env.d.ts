declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    SITE_URL: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
  }
}
