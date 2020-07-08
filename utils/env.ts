export const env = {
  APP_SECRET: process.env.APP_SECRET || "",
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://bttyfrank-portfolios.vercel.app",
}
