import "dotenv/config";
import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

const port = Number(process.env.PORT ?? 3334);
const host = process.env.HOST ?? "0.0.0.0";

app.get("/health", async () => {
  return {
    status: "ok",
    service: "auth-jwt-rbac",
    timestamp: new Date().toISOString(),
  };
});

async function start() {
  try {
    await app.listen({
      port,
      host,
    });

    console.log(`API running on http://${host}:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
