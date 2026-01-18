# GitHub Pages Deployment Setup

Follow these steps to deploy the Physical AI & Humanoid Robotics Textbook System to GitHub Pages.

## Prerequisites

- A GitHub account
- Admin access to the repository
- The repository must be public for free GitHub Pages hosting

## Step 1: Update Configuration Values

Before deploying, update the configuration values in `frontend/docusaurus.config.ts`:

1. Replace `your-username` with your actual GitHub username
2. Replace `physical-ai-textbook` with your actual repository name
3. Update the `url` field to match your GitHub Pages URL format

```ts
// In frontend/docusaurus.config.ts
url: 'https://your-username.github.io',
baseUrl: '/your-repository-name/',
organizationName: 'your-username',
projectName: 'your-repository-name',
```

## Step 2: Build the Static Site

From the frontend directory, build the static site:

```bash
cd frontend
npm run build
```

This creates a `build` directory with all the static files.

## Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on the "Settings" tab
3. Scroll down to the "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" as the branch and "/" as the folder
6. Click "Save"

## Step 4: Set Up Automatic Deployment (Optional)

You can set up GitHub Actions to automatically deploy when you push to main:

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: frontend

      - name: Build website
        run: npm run build
        working-directory: frontend

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/build
          publish_branch: gh-pages
```

## Step 5: Verify Deployment

After the build completes (which may take a few minutes), your site will be available at:

`https://your-username.github.io/your-repository-name/`

## Important Notes

- The site will be built from the `gh-pages` branch or the `/docs` folder in your `main` branch
- Make sure to update the `baseUrl` in `docusaurus.config.ts` to match your repository name
- GitHub Pages URLs follow the format: `https://<USERNAME>.github.io/<REPOSITORY>/`
- Changes may take a few minutes to propagate

## Troubleshooting

### Site not loading CSS or assets
- Verify that your `baseUrl` in `docusaurus.config.ts` matches your repository name exactly
- Check that the URL includes the correct path: `https://username.github.io/repository-name/`

### 404 errors on internal links
- Ensure all links in your markdown files are relative to the `baseUrl`
- Rebuild the site after configuration changes: `npm run build`

### GitHub Actions failing
- Verify that Node.js and npm dependencies are correctly specified
- Check that the build directory matches what GitHub Pages expects

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to your `static` directory in the root of your project
2. Add your domain name as the only content in the file (e.g., `myroboticschool.com`)
3. Configure DNS settings with your domain registrar to point to GitHub Pages
4. Add your custom domain in the GitHub Pages settings section

For more information about GitHub Pages, visit: https://pages.github.com/