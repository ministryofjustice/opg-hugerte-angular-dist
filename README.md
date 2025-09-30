# OPG HugeRTE Angular

This repository is a fork of [hugerte/hugerte-angular](https://github.com/hugerte/hugerte-angular).
It exists so we can maintain our own Angular wrapper for HugeRTE and automate publishing of a distributable package.

---

## Why this repo exists

The upstream `hugerte-angular` package does not provide a prebuilt `dist/` package that can be consumed directly in other projects.
To work around this, we:

1. Maintain the source here in `opg-hugerte-angular`.
2. Build the Angular package (`dist/`) using Docker + Yarn.
3. Publish the built output into [opg-hugerte-angular-dist](https://github.com/ministryofjustice/opg-hugerte-angular-dist).

Downstream projects can then install the package via GitHub with a semver tag:

```json
"@hugerte/hugerte-angular": "github:ministryofjustice/opg-hugerte-angular-dist#semver:v1.0.3"
```

---

## Build process

We always build inside Docker to avoid cross-platform issues (for example `esbuild` binaries).

- **Makefile** provides the main command:
  ```bash
  make build-dist
  ```

  This will:
  - Run `yarn install && yarn build` inside a Docker container.
  - Copy the built `dist/` folder back out to your local machine.

---

## CI/CD process

Publishing to `opg-hugerte-angular-dist` is automated via GitHub Actions:

- **Pull Requests (PRs)**
  On PRs to `main`, CI builds the package and uploads the `dist/` folder as an artifact so you can inspect and test it.

- **Push to `main`**
  On merge to `main`, CI:
  1. Builds the `dist/` folder in Docker.
  2. Checks out the `opg-hugerte-angular-dist` repository.
  3. Copies the new `dist/` contents into that repo.
  4. Opens a Pull Request into `main` (because `main` is a protected branch).

  Reviewers then merge that PR, which updates the distributable package.

---

## Releasing a new version

1. Merge changes to `opg-hugerte-angular/main`.
2. The GitHub Actions workflow will create a PR in `opg-hugerte-angular-dist`.
3. Merge that PR.
4. Optionally create a semver tag (for example `v1.0.4`) in `opg-hugerte-angular-dist`.
5. Consumers can now install the updated package:

   ```json
   "@hugerte/hugerte-angular": "github:ministryofjustice/opg-hugerte-angular-dist#semver:v1.0.4"
   ```