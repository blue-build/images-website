# Ublue images website

This page is [currently a demo version of] an image picker for images built by the ublue-os project, and possibly in the future a whole custom frontpage.

## Contributing

This section is about adding/editing images/features/desktops on the page. For development information, checkout the development section.

All of the data for the website lies in the content directory. Inside you'll find two files.

`images.yml` contains all of the main image metadata. Some of this might be able to be queried from an API in the future, but currently the official Github APIs relating to container metadata on Github Container Registry are pretty lacking.
All of the documentation needed to contribute to `images.yml` live in the document itself. If something is not detailed there, either the documentation is a bit behind or the feature is not implemented yet. Go ahead and ask!

`featureDefinitions.ts` contains the definitions and metadata for the features and desktop environments. If there's an important feature that more than one and less than all of the containers have it should probably be added. The desktop environments should be updated to include exactly those desktop environments and window managers that the images showcased on the site use. More documentation for `featureDefinitions.ts` also live in the file itself.

## Development

This website is built using Astro, Svelte, Typescript, TailwindCSS and Prettier. Some useful commands for this project are declared in the justfile and can be used with the just command runner. This project uses pnpm instead of npm for its superior speed and effiency.

As per the ublue-orgs standards, this project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Set up local environment

To get started, you only need to install `pnpm` and optionally `just`.
In the future, I might provide a distrobox/container image with the environment I use.

1. Clone the project and cd into it.
2. Run `pnpm install` to install to install the deps.
3. Run `pnpm dev` (or `just dev`) to start the autorefreshing Vite dev server.

Once you've made some changes, run `just fmt` (runs the command `pnpm prettier --write . --plugin-search-dir=.`) to format the files accordingly. If this formats some files you didn't touch, commit the changes with a message like `style: prettier fmt`.

### Conventional Commits

- Commits which only change the data in `images.yml` should be tagged with `docs:`
- Commits which only change the styling of the page and don't necessarily add new features should be tagged with `feat(styling):`
- Commits which only change the developer experience should be tagged with `feat(dx):` or `refactor:`

### Rationale

#### Why Typescript and TailwindCSS?

These two are grouped together eventhough they are tools with totally different usecases because the reason for their usage in this project is the same: maintainability. Both provide good conventions for making good code and make it easier to understand the code afterwards.
Additionally: Typescript (by it's very nature) makes it possible to use interface and enums as first-class language features with autocomplete support. This makes it way easier to pass around data in objects.

#### Why Astro?

Astro provides a good foundation for building statically generated (and server rendered) webpages using modern javascript/typescript and popular web component libaries. IMO it is quite fun to work with, and there's rarely any problems with it. This website could've been a Svelte SPA, but with Astro there's always the possibility of expanding this page into a static multi-page website.

#### Why Svelte?

Svelte (IMO) is a breeze to work with. The reactivity is effortless and the syntax on top of standard HTML is pretty minimal and elegant. HAving a JS framework was basically necessary to have a functioning filtering system without making total spaghetti code, so Svelte was the obvious choice.

#### Why prettier?

Prettier is an opionated code formatter which enables consistency and best practices in formatting. And it just happens to support everything this project is based on.

#### Why not MkDocs?

_For the joys of modern typescript-based web development._
AKA. because I'm not familiar with it, and this toolkit allows a more _custom_ approach to web dev, basically enabling the use of all of the technologies mentioned above.
