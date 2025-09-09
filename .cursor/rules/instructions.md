# Cursor AI Assistant Project Rules

## Response Format Requirements
- ALWAYS start responses with a confidence percentage, e.g., `**Confidence: 85%**`.
- Immediately after, provide a Turkish bullet list of planned actions:
- ALWAYS When explaining things to me, always use Turkish, except for technical terms. And I definitely want a Turkish explanation before every command. If you're giving me a terminal command, you need to explain it first.
```
**Yapılacaklar:**
• [Kısa eylem maddesi]
• [Kısa eylem maddesi]
• [Kısa eylem maddesi]
```
- Use Turkish for explanations; use English where technical clarity is needed in code comments.
- Always reference this file before replying. If missing or empty, state that fact and ask whether to create/populate it.

## Code and Command Suggestions
- Do not provide code or commands without the confidence percentage and Turkish action bullets first.
- Ensure all suggestions align with these rules.

## Library Styling Guidance (react-chart-lite)
- The published package MUST NOT depend on Tailwind CSS.
- Tailwind may be used only in example apps (e.g., `examples/demo-vite`) as dev dependency.
- Prefer CSS Modules (`*.module.scss`) for isolated base styles.
- Expose customization via:
  - `className` and `style` props on components
  - Optional `classes` object to override internal parts
  - CSS Custom Properties (variables) for theming (e.g., `--rcl-color-primary`)
  - Optional `unstyled` prop to render with minimal/no default styling
- Publish a compiled stylesheet (e.g., `dist/styles.css`) and mark CSS as side effects in `package.json`.

## Communication Style
- Be concise but clear; organize with headings and concise lists.
- Avoid heavy formatting; only use code fences for code or configuration.
- When citing repository code, include file path references. 