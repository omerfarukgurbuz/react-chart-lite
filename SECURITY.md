# Security Policy

## Supported Versions

The following table lists which versions of `react-chart-lite` currently receive security updates.

| Version | Supported |
| ------- | --------- |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

Notes:
- Security fixes are released as patch versions (e.g., 1.0.z).
- Pre-releases and the `main` branch are best-effort only and not recommended for production.

## Reporting a Vulnerability

Please do not open a public GitHub issue for security vulnerabilities.

Preferred reporting methods:
1. GitHub Security Advisory (private): https://github.com/omerfarukgurbuz/react-chart-lite/security/advisories/new
2. Email: mr.gurbuzf@gmail.com (subject: "SECURITY: [short summary]")

When reporting, please include (if possible):
- A clear description of the issue and potential impact
- A minimal reproducible example or proof-of-concept
- Affected version(s) of `react-chart-lite` and your environment (OS, Node, React)
- Any relevant logs, stack traces, or screenshots

### Vulnerability Handling Process
- Acknowledgement: We aim to acknowledge receipt within 48 hours.
- Triage: We investigate and assess severity within 5 business days.
- Fix timeline: We strive to release fixes for critical/high issues as soon as reasonably possible, typically within 14 days, and medium/low issues in the next appropriate release.
- Updates: We provide status updates at least weekly while the report is open.
- Disclosure: We coordinate a responsible disclosure, publish a GitHub Security Advisory, and include details in the release notes once a fix is available.

### Scope and Out-of-Scope
In scope: Code in this repository published as the `react-chart-lite` package.

Out of scope:
- Issues in example apps under `examples/` or third-party dependencies not directly maintained here
- Misconfiguration in consumer applications using this library
- Vulnerabilities that require privileged access to a developer's machine/environment

### Credit
We are happy to provide public credit to reporters in the advisory and changelog, unless you prefer to remain anonymous.
