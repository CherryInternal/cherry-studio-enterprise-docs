# GitHub Actions Configuration

## Secrets Setup

To enable FTP deployment, you need to configure the following secrets in your GitHub repository:

### Required Secrets

1. **FTP_HOST**: Your FTP server hostname
2. **FTP_USERNAME**: Your FTP username
3. **FTP_PASSWORD**: Your FTP password

### How to Configure Secrets

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with the corresponding values:

   - **Name**: `FTP_HOST`
     **Value**: Your FTP server hostname (e.g., `ftp.yourserver.com`)

   - **Name**: `FTP_USERNAME`
     **Value**: Your FTP username

   - **Name**: `FTP_PASSWORD`
     **Value**: Your FTP password

## Workflow Details

The GitHub Actions workflow (`build-and-deploy.yml`) will:

1. **Trigger on**:
   - Push to `main` or `develop` branches
   - Pull requests to `main` branch

2. **Build Process**:
   - Install Node.js 18
   - Install dependencies with Yarn
   - Run linting
   - Run tests
   - Build the application
   - Build Docker image (optional)

3. **Deploy Process** (only on main branch push):
   - Upload `dist/` folder to FTP server root directory
   - Exclude git files, node_modules, and .DS_Store files

## Note

Make sure your FTP server is accessible and the credentials are correct before pushing to the main branch.