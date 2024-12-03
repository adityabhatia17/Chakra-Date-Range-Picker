// Update the imports to be from peer dependencies
import {
  Box,
  Button,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useCallback, useState } from "react";
import { DateRangePickerProps } from ".";

function ChakraDateRangePicker({
  startDate,
  endDate,
  onChange,
  locale = "default",
  dateFormat,
  minDate,
  maxDate,
}: DateRangePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selecting, setSelecting] = useState<"start" | "end" | null>(null);

  const getDaysInMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const generateCalendarDays = useCallback(
    (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = getDaysInMonth(year, month);
      const days = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }

      // Add days of the month
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      return days;
    },
    [getDaysInMonth]
  );

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!selecting || selecting === "start") {
        onChange(date, null);
        setSelecting("end");
      } else {
        if (startDate && date < startDate) {
          onChange(date, startDate);
        } else {
          onChange(startDate, date);
        }
        setSelecting(null);
      }
    },
    [onChange, selecting, startDate]
  );

  const nextMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  }, [currentDate]);

  const prevMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  }, [currentDate]);

  const getNextMonthDate = useCallback(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  }, [currentDate]);

  const renderCalendar = useCallback(
    (date: Date) => (
      <VStack spacing={4}>
        <Text fontWeight="bold">
          {date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <Grid templateColumns="repeat(7, 1fr)" gap={0}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <Box key={day} textAlign="center" fontWeight="bold" border="none">
              {day}
            </Box>
          ))}
          {generateCalendarDays(date).map((date, index) => (
            <Box
              key={index}
              textAlign="center"
              p={3}
              cursor={date ? "pointer" : "default"}
              position="relative"
              border="none"
              _before={
                date &&
                startDate &&
                endDate &&
                date >= startDate &&
                date <= endDate
                  ? {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bg: "electricBlue.50",
                      zIndex: -1,
                    }
                  : undefined
              }
              bg={
                date
                  ? (startDate && date.getTime() === startDate.getTime()) ||
                    (endDate && date.getTime() === endDate.getTime())
                    ? "electricBlue.500"
                    : "transparent"
                  : "transparent"
              }
              color={
                date &&
                ((startDate && date.getTime() === startDate.getTime()) ||
                  (endDate && date.getTime() === endDate.getTime()))
                  ? "white"
                  : "inherit"
              }
              borderRadius={
                date
                  ? (startDate && date.getTime() === startDate.getTime()) ||
                    (endDate && date.getTime() === endDate.getTime())
                    ? 8
                    : 0
                  : 0
              }
              _hover={date ? { bg: "electricBlue.50" } : undefined}
              onClick={() => date && handleDateClick(date)}
            >
              {date ? date.getDate() : ""}
            </Box>
          ))}
        </Grid>
      </VStack>
    ),
    [generateCalendarDays, handleDateClick, startDate, endDate]
  );

  return (
    <Popover>
      <PopoverTrigger>
        <InputGroup>
          <Input
            placeholder="Start date → End date"
            value={
              startDate || endDate
                ? `${startDate?.toLocaleDateString()} → ${
                    endDate?.toLocaleDateString() || "Select end date"
                  }`
                : ""
            }
            readOnly
            width="100%"
          />
          <InputRightElement>
            <CalendarIcon color="gray.500" />
          </InputRightElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent p={4} width="auto">
        <VStack spacing={4}>
          <HStack justify="space-between" width="100%">
            <Button size="sm" onClick={prevMonth}>
              <ChevronLeftIcon />
            </Button>
            <HStack spacing={8}>
              {renderCalendar(currentDate)}
              {renderCalendar(getNextMonthDate())}
            </HStack>
            <Button size="sm" onClick={nextMonth}>
              <ChevronRightIcon />
            </Button>
          </HStack>
        </VStack>
      </PopoverContent>
    </Popover>
  );
}

export default ChakraDateRangePicker;
