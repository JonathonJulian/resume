# Jonathon Fritz's Resume

A modern, interactive resume built with React, TypeScript, and Tailwind CSS.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment to GitHub Pages

### Automatic Deployment (GitHub Actions)

This repository is configured with GitHub Actions to automatically deploy to GitHub Pages whenever changes are pushed to the main branch.

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy the site
3. Visit https://jonathanjulian.github.io/resume/ to see the deployed site

### Manual Deployment

You can also manually deploy the site using the following command:

```bash
npm run deploy
```

This will build the project and push the build files to the `gh-pages` branch, which GitHub Pages will then deploy.

## Configuration

- The base URL for GitHub Pages is configured in `vite.config.ts`
- The homepage URL is configured in `package.json`
- GitHub Actions workflow is defined in `.github/workflows/deploy.yml`