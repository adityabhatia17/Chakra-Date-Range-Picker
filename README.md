# Chakra Date Range Picker

A beautiful and customizable date range picker component built for Chakra UI. This component allows users to select date ranges with an intuitive interface, perfect for booking systems, report generation, or any application requiring date range selection.

![npm](https://img.shields.io/npm/v/chakra-date-range-picker-component)
![license](https://img.shields.io/npm/l/chakra-date-range-picker-component)

## Features

- 📅 Built on top of Chakra UI
- 🎨 Fully customizable theme support
- 📱 Responsive design
- 🌍 Locale support
- 📆 Date range selection with visual feedback
- ⌨️ Keyboard navigation support
- 🎯 Min/Max date constraints

## Installation

```bash
npm install chakra-date-range-picker-component

# or

yarn add chakra-date-range-picker-component
```

## Prerequisites

This component requires Chakra UI as a peer dependency. If you haven't already installed it, you can do so by running:

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## Usage

```jsx
import { ChakraDateRangePicker } from 'chakra-date-range-picker-component';

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <ChakraDateRangePicker
      startDate={startDate}
      endDate={endDate}
      onChange={handleDateChange}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `startDate` | `Date` | `null` | The selected start date |
| `endDate` | `Date` | `null` | The selected end date |
| `onChange` | `function` | Required | Callback function that is called when dates are selected. Receives two parameters: (startDate, endDate) |
| `locale` | `string` | `'default'` | The locale to use for formatting dates |
| `dateFormat` | `string` | - | Custom date format for the input display |
| `minDate` | `Date` | - | The minimum selectable date |
| `maxDate` | `Date` | - | The maximum selectable date |

## Styling

The component uses Chakra UI's theme system, which means you can customize it using Chakra UI's theme customization features. The component uses the following Chakra UI components internally:

- Box
- Button
- Grid
- HStack
- Input
- InputGroup
- Popover
- Text
- VStack

You can customize the appearance by using Chakra UI's theme customization:

```jsx
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    ChakraDateRangePicker: {
      // Add your custom styles here
    },
  },
});
```

## Examples

### Basic Usage
```jsx
<ChakraDateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={(start, end) => {
    setStartDate(start);
    setEndDate(end);
  }}
/>
```

### With Min/Max Dates
```jsx
<ChakraDateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={handleDateChange}
  minDate={new Date('2024-01-01')}
  maxDate={new Date('2024-12-31')}
/>
```

### With Custom Locale
```jsx
<ChakraDateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={handleDateChange}
  locale="fr-FR"
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 

## Support

If you have any questions or need help, please open an issue on GitHub.
