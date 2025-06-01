import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
} from "@tanstack/react-table";
import useFetchSales from "../../hooks/useSales";
import { OACSales } from "../../interfaces";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  Loader,
  Portal,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Table,
} from "@chakra-ui/react";
import { assigned, implantsType } from "../../utils/data";
import { useNavigate } from "react-router";
import { getNepaliDate } from "../../utils/getNepaliDate";

function getAssignedFilterValue(filters: ColumnFiltersState): string {
  const val = filters.find((f) => f.id === "assigned")?.value;
  return typeof val === "string" ? val : "";
}

function getImplantsTypeFilterValue(filters: ColumnFiltersState): string {
  const val = filters.find((f) => f.id === "implants_type")?.value;
  return typeof val === "string" ? val : "";
}

function updateFilter(
  filters: ColumnFiltersState,
  id: string,
  value: string
): ColumnFiltersState {
  const others = filters.filter((f) => f.id !== id);
  if (value === "") return others;
  return value ? [...others, { id, value }] : others;
}

const SalesTable: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, loading } = useFetchSales();
  const navigate = useNavigate();

  const columns: ColumnDef<OACSales>[] = [
    { accessorKey: "id", header: "S.No" },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => getNepaliDate(getValue() as string),
    },
    { accessorKey: "bill_no", header: "Bill No" },
    { accessorKey: "implants_name", header: "Name of Implants" },
    {
      accessorKey: "implants_type",
      header: "Type of Implants",
      filterFn: "equals",
      cell: (info) => info.getValue(),
    },
    { accessorKey: "size", header: "Size" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "rate", header: "Rate" },
    { accessorKey: "total_price", header: "Total Price" },
    {
      accessorKey: "assigned",
      header: "Assigned",
      filterFn: "equals",
      cell: (info) => info.getValue(),
    },
    { accessorKey: "institute", header: "Institute" },
    { accessorKey: "surgeon", header: "Surgeon" },
    { accessorKey: "remarks", header: "Remarks" },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack gap={6} width="100%" px={{ base: 4, md: 8 }} py={6}>
      <Heading size="lg" textAlign="center" fontSize="2xl">
        OAC Sales
      </Heading>

      <Flex justify={{ base: "center", md: "flex-end" }}>
        <Button onClick={() => navigate("/add-new-sale")}>
          Add a New Sale
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 10 }}>
        <InputGroup>
          <Input
            width="100%"
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all fields..."
          />
        </InputGroup>

        <Box>
          <Select.Root
            collection={assigned}
            size="sm"
            value={[getAssignedFilterValue(columnFilters)]}
            onValueChange={(e) => {
              setColumnFilters((prev) =>
                updateFilter(prev, "assigned", e.value[0])
              );
            }}
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Assignee" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {assigned.items.map((assignee) => (
                    <Select.Item item={assignee} key={assignee.value}>
                      {assignee.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Box>

        <Box mt={1}>
          <RadioGroup.Root
            value={getImplantsTypeFilterValue(columnFilters)}
            onValueChange={(event) => {
              setColumnFilters((prev) =>
                updateFilter(prev, "implants_type", event.value ?? "")
              );
            }}
          >
            <HStack wrap="wrap" gap={4}>
              {implantsType.map((type) => (
                <RadioGroup.Item key={type.value} value={type.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{type.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        </Box>
      </SimpleGrid>

      <Box overflowX="auto">
        <Table.Root size="sm">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " ▲"
                      : header.column.getIsSorted() === "desc"
                      ? " ▼"
                      : null}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Stack>
  );
};

export default SalesTable;
