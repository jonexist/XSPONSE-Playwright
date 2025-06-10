# Xsponse Automation Testing

End-to-end testing suite for Xsponse using Playwright.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Visual Studio Code (recommended)

## Setup

1. Clone the repository:

```powershell
git clone <repository-url>
cd Xsponse-Automation-Testing
```

2. Install dependencies:

```powershell
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
   - Update `.env` with your credentials:
   ```plaintext
   BASE_DEV_URL=https://app.odi.xsponse.com
   TEST_EMAIL=your.email@xsponse.com
   TEST_PASSWORD=your_password
   ```

## Running Tests

The following npm scripts are available:

```powershell
# Run all tests
npm run playwright

# Run tests with UI mode
npm run playwright:ui

# Generate tests with codegen
npm run playwright:codegen

# Debug tests
npm run playwright:debug

# View HTML test report
npm run playwright:report
```

## Project Structure

```
├── e2e-tests/              # Test files
│   ├── global.setup.ts     # Global authentication setup
│   └── *.spec.ts          # Test specification files
├── playwright/            # Playwright configuration
├── playwright-report/     # HTML test reports
└── test-results/         # Test execution artifacts
```

## Authentication

The project uses Playwright's built-in authentication handling:

- Authentication state is stored in `playwright/.auth/user.json`
- Login credentials are managed via environment variables
- Global setup handles authentication before tests run

## Environment Variables

| Variable        | Description                       | Required |
| --------------- | --------------------------------- | -------- |
| `BASE_DEV_URL`  | Base URL for the application      | Yes      |
| `TEST_EMAIL`    | Login email for authentication    | Yes      |
| `TEST_PASSWORD` | Login password for authentication | Yes      |

## Best Practices

1. Never commit the `.env` file
2. Keep credentials secure and never hardcode them
3. Use `playwright/.auth/user.json` for authenticated state (auto-generated)

## Troubleshooting

If tests fail due to authentication:

1. Delete `playwright/.auth/user.json`
2. Verify `.env` credentials
3. Run tests again to regenerate auth state

## Contributing

1. Create feature branch
2. Add or update tests
3. Update documentation as needed
4. Submit pull request

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Environment Setup Guide](https://playwright.dev/docs/test-configuration)
