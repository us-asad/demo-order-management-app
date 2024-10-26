import { OrderStatusTexts } from "@/constants/statuses";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import React, { useEffect, useMemo, useState } from "react";
import { Props } from "./types";
import dayjs from "dayjs";
import { useDebounce } from "use-debounce"
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { defaultFromDate, defaultToDate } from "../../orders-table";
import { useOrdersHeaderFilter } from "./orders-header-filter.styles";

export const OrdersHeaderFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useDebounce(searchQuery, 300);
  const isFiltersApplied = useMemo(() => Boolean(filters.from !== defaultFromDate || filters.to !== defaultToDate || filters.search || typeof filters.status === "number"), [filters]);
  const styles = useOrdersHeaderFilter();

  const onResetFilter = () => {
    setFilters({
      from: defaultFromDate,
      to: defaultToDate,
      search: "",
    });
    setSearchQuery("");
    setDebouncedSearchQuery("");
  }

  const handleChangeDateRange = (value: DateRange<dayjs.Dayjs>) => {
    if (new Date(value[0] as any) < new Date(value[1] as any)) {
      setFilters(prev => ({ ...prev, from: new Date(value[0] as any), to: new Date(value[1] as any) }))
    }
  }

  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearchQuery }))
  }, [debouncedSearchQuery]);

  return (
    <Box className={styles.wrapper}>
      <DateRangePicker
        value={[
          filters.from ? dayjs(filters.from) : null,
          filters.to ? dayjs(filters.to) : null,
        ]}
        onChange={handleChangeDateRange}
        localeText={{ start: 'Created From', end: 'Until' }}
        className={styles.dateRangePicker}
      />
      <FormControl className={styles.selectController}>
        <InputLabel id="order-status-select">Status</InputLabel>
        <Select
          labelId="order-status-select"
          id="order-status-select"
          value={filters.status ?? ""}
          onChange={event => setFilters(prev => ({ ...prev, status: +event.target.value }))}
          label="Status"
        >
          {OrderStatusTexts.map((statusText, index) => <MenuItem key={index} value={index}>{statusText}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField label="Search" variant="outlined" className={styles.searchField} value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
      <Button disabled={!isFiltersApplied} onClick={onResetFilter}>Reset Filter</Button>
    </Box>
  )
}