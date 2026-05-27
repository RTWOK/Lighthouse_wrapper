import esbuild from "esbuild";

const entries = [
    {
        entry: 'assets/js/Main.js',
        exit: 'app/public/js/app.js',
    },
    {
        entry: 'assets/js/Audits.js',
        exit: 'app/public/js/audits.js',
    }
    
];

async function buildJS(entries) {
    for (const entry of entries) {
            await esbuild.build({
                entryPoints: [entry.entry],
                bundle: true,
                format: "esm",
                outfile: entry.exit
        });
    }
}

buildJS(entries);
