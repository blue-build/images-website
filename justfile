default:
    just -l

dev:
    pnpm dev

fmt:
    pnpm prettier --write . --plugin-search-dir=.

# build the cosign container and generate a keypair
cosign:
    podman build ./cosign -t ucosign && podman run -it localhost/ucosign

publish:
    pnpm build
    netlify deploy --prod