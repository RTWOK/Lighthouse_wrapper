import { createServer } from "./server.js";

const port = Number(process.env.PORT || 3000);
const app = await createServer();

app.listen({ port }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    app.log.info(`Server listening at ${address}`);
});
