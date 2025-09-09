# Contributing to react-chart-lite

First off, thank you for considering contributing to react-chart-lite! It's people like you that make react-chart-lite such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the [react-chart-lite Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **Include your environment details:**
  * React version
  * react-chart-lite version
  * Browser name and version
  * Operating system

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help demonstrate the steps or point out the part which the suggestion is related to.
* **Explain why this enhancement would be useful** to most react-chart-lite users.

### Pull Requests

Please follow these steps to have your contribution considered by the maintainers:

1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies**: Run `yarn install` in the root directory.
3. **Make your changes**: Implement your feature or bug fix.
4. **Write/update tests** if applicable.
5. **Update the documentation** if you're changing functionality.
6. **Ensure the test suite passes**: Run `yarn test` (if tests are available).
7. **Build the project**: Run `yarn build` to ensure it compiles without errors.
8. **Format your code**: Ensure your code follows the existing style.
9. **Commit your changes**: Use clear and meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/).
10. **Push to your fork** and submit a pull request.

### Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/[your-username]/react-chart-lite.git
cd react-chart-lite
```

2. Install dependencies:
```bash
yarn install
```

3. Build the library:
```bash
yarn build
```

4. To test your changes in the example app:
```bash
cd examples/demo-vite
yarn install
yarn dev
```

### Project Structure

```
react-chart-lite/
├── src/                    # Source code
│   ├── components/        # Chart components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── index.ts          # Main export file
├── dist/                  # Built files (generated)
├── examples/              # Example applications
│   └── demo-vite/        # Vite demo app
├── scripts/               # Build scripts
└── package.json
```

### Coding Guidelines

* **TypeScript**: All code should be written in TypeScript with proper type definitions.
* **Components**: Follow React best practices and hooks patterns.
* **Styling**: Use CSS Modules for component styles. Do not add Tailwind as a dependency.
* **Props**: Provide comprehensive TypeScript interfaces for all component props.
* **Documentation**: Update README files and inline documentation for any API changes.
* **Accessibility**: Ensure all interactive elements are keyboard accessible and have proper ARIA labels.
* **Performance**: Consider performance implications, especially for large datasets.

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` A new feature
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Changes that do not affect the meaning of the code
* `refactor:` A code change that neither fixes a bug nor adds a feature
* `perf:` A code change that improves performance
* `test:` Adding missing tests or correcting existing tests
* `chore:` Changes to the build process or auxiliary tools

Examples:
```
feat: add animation support to PieChart
fix: correct tooltip positioning in VerticalBarChart
docs: update HorizontalBarChart README with new props
```

### Testing

* Write tests for any new functionality
* Ensure all existing tests pass
* Test your changes across different browsers
* Test with both React 18 and React 19 if possible

### Documentation

* Update the README.md files in component directories for any API changes
* Include JSDoc comments for public methods and complex logic
* Provide examples for new features
* Update the main README.md if adding new components or major features

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
