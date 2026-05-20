import path from "node:path";
import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import nunjucks from "nunjucks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const app = Fastify({
  logger: true
});

app.register(fastifyStatic, {
  root: path.join(rootDir, "app", "public"),
  prefix: "/"
});

app.register(fastifyView, {
  engine: {
    nunjucks
  },
  root: path.join(rootDir, "app", "views")
});

app.get("/", async (request, reply) => {
  return reply.view("pages/index.njk", {
    title: "Lighthouse Wrapper"
  });
});

const port = Number(process.env.PORT || 3000);

app.listen({ port }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`Server listening at ${address}`);
});
