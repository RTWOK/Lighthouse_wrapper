import esbuild from "esbuild";

async function buildJS(entry, exit) {
    await esbuild.build({
        entryPoints: ["assets/js/Main.js"],
        bundle: true,
        format: "esm",
        outfile: "app/public/js/app.js",
    });
}

