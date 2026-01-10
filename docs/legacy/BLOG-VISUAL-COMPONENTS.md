# Blog Visual Components Guide

This document describes the visual statistics components available for blog posts and how to use them.

## Overview

The blog visual components library provides a set of reusable React components designed to display statistics, costs, penalties, and other data in an engaging, scannable format. These components maintain the Mango Law brand aesthetic with the mango/gold/leaf color palette.

## Available Components

### StatCard

Large number displays with icons for highlighting key statistics.

**Use Cases:**
- Displaying important numeric facts (jail time, fine amounts)
- Highlighting success rates or percentages
- Showing case statistics

**Props:**
- `value`: string | number - The main statistic to display
- `label`: string - Descriptive label for the statistic
- `icon?`: LucideIcon - Optional icon component
- `color?`: 'mango' | 'gold' | 'leaf' | 'forest' | 'red' | 'blue' - Color theme
- `description?`: string - Additional context or explanation
- `trend?`: ReactNode - Optional trend indicator

### ComparisonCard

Side-by-side comparison displays for contrasting two related pieces of information.

**Use Cases:**
- Comparing penalties (first offense vs. repeat offense)
- Showing before/after scenarios
- Contrasting different charge levels

**Props:**
- `title?`: string - Optional header for the comparison
- `leftItem`: ComparisonItem - Left side data
- `rightItem`: ComparisonItem - Right side data
- `leftColor?`: 'mango' | 'gold' | 'leaf' | 'red' | 'blue' - Left side color
- `rightColor?`: 'mango' | 'gold' | 'leaf' | 'red' | 'blue' - Right side color

### TimelineBar

Visual timeline displays showing durations, periods, or sequential events.

**Use Cases:**
- License suspension periods
- Jail time ranges
- Case processing timelines
- Probation durations

**Props:**
- `title?`: string - Optional header
- `items`: TimelineItem[] - Array of timeline items with label, duration, color, and width

### CostBreakdown

Itemized cost displays with visual hierarchy showing individual line items and totals.

**Use Cases:**
- Total cost of OVI conviction
- Legal fees breakdown
- Court costs and fines
- Long-term financial impact

**Props:**
- `title?`: string - Optional header
- `items`: CostItem[] - Array of cost items with label, amount, description, and isTotal flag

### PenaltyGrid

Responsive table displays for penalty information across different offense levels.

**Use Cases:**
- Comparing penalties by offense type
- Showing escalating consequences
- Displaying statutory requirements
- Multiple charge comparisons

**Props:**
- `title?`: string - Optional header
- `columns`: Array of column definitions (key and label)
- `rows`: Array of data rows

### ProgressBar

Percentage displays with animated progress bars.

**Use Cases:**
- Success rates
- Completion percentages
- Risk levels
- Probability indicators

**Props:**
- `label`: string - Description of what's being measured
- `percentage`: number - Value from 0-100
- `color?`: 'mango' | 'gold' | 'leaf' | 'red' | 'blue' - Bar color
- `showValue?`: boolean - Whether to display the percentage (default: true)
- `description?`: string - Additional context

### IconStat

Compact inline statistics with icons for embedding within text content.

**Use Cases:**
- Quick facts within paragraphs
- Small data callouts
- Inline metrics

**Props:**
- `icon`: LucideIcon - Icon to display
- `value`: string | number - Statistic value
- `label`: string - Descriptive label
- `color?`: 'mango' | 'gold' | 'leaf' | 'red' | 'blue' - Color theme

### HighlightBox

Color-coded callout boxes for important information, warnings, or key takeaways.

**Use Cases:**
- Important notices
- Key warnings
- Success tips
- Error explanations

**Props:**
- `children`: ReactNode - Content to display
- `variant?`: 'info' | 'success' | 'warning' | 'error' - Box style
- `title?`: string - Optional header

## Using Visual Components in Blog Posts

### Adding Component Markers

Visual components are inserted into blog post content using special markers in the format:

```
[VISUAL:COMPONENT_NAME]
```

The parser in `BlogPostPage.tsx` detects these markers and renders the appropriate component.

### Example: OVI Blog Post

```typescript
## Penalties for First-Time OVI in Ohio

First-time OVI offenses carry serious consequences:

[VISUAL:OVI_PENALTIES]

**Criminal Penalties:**
- Jail time: 3 days minimum to 6 months maximum
- Fines: $375 to $1,075

**Financial Impact:**
- Total costs often exceed $10,000

[VISUAL:OVI_COSTS]
```

### Defining Custom Visual Components

To add a new visual component type:

1. **Create the component definition** in `BlogPostPage.tsx`:

```typescript
if (visualType === 'MY_NEW_COMPONENT') {
  return (
    <PenaltyGrid
      key={index}
      title="My Component Title"
      // ... props
    />
  );
}
```

2. **Add the marker** in the blog post content:

```
[VISUAL:MY_NEW_COMPONENT]
```

## Best Practices

### Placement

- Insert visual components after introducing the topic in text
- Don't overuse - aim for one visual component per 3-4 paragraphs
- Place cost breakdowns after discussing financial implications
- Position penalty grids after explaining consequences

### Color Selection

- **Mango** (orange): Primary brand color, use for neutral/positive stats
- **Gold** (yellow): Warning or caution, mid-level concerns
- **Leaf** (green): Positive outcomes, success indicators
- **Red**: Negative consequences, severe penalties
- **Blue**: Information, neutral facts

### Accessibility

- All components include proper semantic HTML
- Color is not the only indicator (text labels provided)
- Components are keyboard accessible
- Alt text should be provided for any icons

### Mobile Responsiveness

- All components are designed mobile-first
- Tables automatically adapt to smaller screens
- Side-by-side comparisons stack vertically on mobile
- Text remains readable at all viewport sizes

## Component Library Location

All visual components are located in:
```
src/components/blog/
├── StatCard.tsx
├── ComparisonCard.tsx
├── TimelineBar.tsx
├── CostBreakdown.tsx
├── PenaltyGrid.tsx
├── ProgressBar.tsx
├── IconStat.tsx
├── HighlightBox.tsx
└── index.ts  (exports all components)
```

## Brand Consistency

All components follow the Mango Law brand guidelines:

- **Font Family**: Inter (UI), Lora (headings)
- **Color Palette**: Mango, Gold, Leaf, Forest (defined in Tailwind config)
- **Border Radius**: Consistent rounded corners (rounded-lg, rounded-xl)
- **Shadows**: Soft shadows (shadow-soft, shadow-lift)
- **Spacing**: 8px grid system
- **Typography**: Clear hierarchy with bold headings

## Future Enhancements

Planned additions to the visual components library:

- **ChartComponent**: Bar and pie charts for data visualization
- **StatGrid**: Multi-column stat displays
- **ProcessFlow**: Step-by-step process visualizations
- **TestimonialCard**: Client testimonial callouts
- **CaseStudyBox**: Detailed case examples
- **QuickFactsList**: Bulleted key facts with icons
- **NumberedSteps**: Sequential process steps
- **MapComponent**: Geographic service area displays

## Support

For questions or issues with visual components:
- Review component source code in `src/components/blog/`
- Check `BlogPostPage.tsx` for parser implementation
- Refer to existing blog posts for usage examples
