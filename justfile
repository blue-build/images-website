default:
    just -l

dev:
    pnpm dev

fmt:
    pnpm prettier --write . --plugin-search-dir=.