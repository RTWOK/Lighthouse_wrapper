import path from "node:path";
import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import nunjucks from "nunjucks";
import routes from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

export async function createServer() {
    const app = Fastify({
        logger: false
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

    app.register(routes);

    app.addContentTypeParser("application/x-www-form-urlencoded",{ parseAs: "string" }, function (request, payload, done) {
        const body = Object.fromEntries(new URLSearchParams(payload));
        done(null, body);
    }
);

    return app;
}
