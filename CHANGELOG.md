# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of react-chart-lite
- HorizontalBarChart component with full customization support
- VerticalBarChart component with optional line series overlay
- PieChart component with donut variant support
- RadarChart component for multi-dimensional data visualization
- CSS Modules based styling with zero external CSS framework dependencies
- Full TypeScript support with comprehensive type definitions
- Theme customization via CSS custom properties
- Accessibility features including ARIA labels and keyboard navigation
- SSR/CSR compatibility for Next.js and other frameworks
- Tooltip support with smart positioning
- Legend component with interactive hover effects
- Grid system with customizable line styles (solid, dashed, dotted)
- Animation support with configurable duration
- Responsive design that adapts to container size
- `unstyled` prop for complete style customization
- `classes` prop for granular style overrides
- Auto-scaling when scale not provided
- Value formatting support for different data types
- Click handlers for interactive charts
- Comprehensive documentation for each component
- Example application using Vite + React 19

### Features by Component

#### HorizontalBarChart
- Multiple series support
- Customizable bar height and spacing
- Optional value labels on bars
- Horizontal and vertical grid lines
- Category-based grouping

#### VerticalBarChart
- Multiple bar series
- Optional line series overlay
- Mixed chart types (bar + line)
- Customizable chart height
- Line points with configurable radius

#### PieChart
- Full pie and donut modes
- Customizable inner radius ratio
- Pad angle for slice separation
- Label formatter for custom text
- Percentage calculations

#### RadarChart
- Multiple data series
- Customizable axes count
- Fill opacity per series
- Grid rings with intervals
- Axis labels positioning

### Technical Features
- React 18 and 19 compatibility
- Tree-shakeable exports
- Minimal bundle size
- No runtime dependencies beyond React
- CSS Modules for style isolation
- Build system using TypeScript + tsc-alias
- Automatic CSS copying in build process

## [1.0.0] - 2024-XX-XX

### Added
- First stable release
- Production-ready components
- Complete documentation
- MIT License
