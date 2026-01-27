import { Fragment, useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Card,
  CardContent,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAlertContext } from "contexts/alert";

interface FinancialRecord {
  id?: string;
  title: string;
  date: string;
  type: "income" | "expenditure";
  subType: string;
  value: number;
  description: string;
}

interface GroupedRecords {
  [date: string]: FinancialRecord[];
}

// Type to SubType mapping
const TYPE_SUBTYPES: Record<string, string[]> = {
  income: [
    "Salary",
    "Dividend",
    "Capital Gain",
    "Interest",
    "Insurance Claim",
    "Freelance",
    "Bonus",
    "Other Income",
  ],
  expenditure: [
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Education",
    "Housing",
    "Insurance",
    "Other Expenditure",
  ],
};

const FinancingPage = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FinancialRecord>({
    title: "",
    date: new Date().toISOString().split("T")[0],
    type: "income",
    subType: "Salary",
    value: 0,
    description: "",
  });

  const { alertDispatch } = useAlertContext();

  // Helper function to get records for the selected month
  const getRecordsForMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthNum = month.getMonth();
    return records.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === year &&
        recordDate.getMonth() === monthNum
      );
    });
  };

  // Helper function to calculate pie chart data
  const calculateChartData = (type: "income" | "expenditure") => {
    const monthRecords = getRecordsForMonth(selectedMonth);
    const typeRecords = monthRecords.filter((r) => r.type === type);

    const subTypeMap: Record<string, number> = {};
    typeRecords.forEach((record) => {
      subTypeMap[record.subType] =
        (subTypeMap[record.subType] || 0) + record.value;
    });

    return Object.entries(subTypeMap).map(([name, value], index) => ({
      id: index,
      value: parseFloat(value.toFixed(2)),
      label: name,
    }));
  };

  // Month navigation handlers
  const handlePreviousMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1)
    );
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };
  useEffect(() => {
    // TODO: Replace with actual API call
    // For now, using sample data
    const sampleRecords: FinancialRecord[] = [
      {
        id: "1",
        title: "Salary",
        date: "2026-01-27",
        type: "income",
        subType: "Salary",
        value: 50000,
        description: "Monthly salary",
      },
      {
        id: "2",
        title: "Electricity Bill",
        date: "2026-01-27",
        type: "expenditure",
        subType: "Utilities",
        value: 800,
        description: "January electricity bill",
      },
      {
        id: "3",
        title: "Freelance Project",
        date: "2026-01-27",
        type: "income",
        subType: "Freelance",
        value: 15000,
        description: "Web development project",
      },
      {
        id: "4",
        title: "Groceries",
        date: "2026-01-26",
        type: "expenditure",
        subType: "Food",
        value: 1200,
        description: "Weekly groceries",
      },
      {
        id: "5",
        title: "Dividend Income",
        date: "2026-01-26",
        type: "income",
        subType: "Dividend",
        value: 5000,
        description: "Dividend from stocks",
      },
    ];
    setRecords(sampleRecords);
  }, []);

  const handleOpenDialog = (record?: FinancialRecord) => {
    if (record) {
      setFormData(record);
      setEditingId(record.id || null);
    } else {
      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0],
        type: "income",
        subType: "Salary",
        value: 0,
        description: "",
      });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const newValue = name === "value" ? parseFloat(value as string) : (value as string);

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };

      // When type changes, reset subType to the first available option
      if (name === "type") {
        updated.subType = TYPE_SUBTYPES[value as string][0];
      }

      return updated;
    });
  };

  const handleSaveRecord = () => {
    if (!formData.title || formData.value <= 0 || !formData.date) {
      alertDispatch({
        type: "setError",
        message: "Please fill in all required fields with valid values",
      });
      return;
    }

    // TODO: Replace with actual API call
    if (editingId) {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === editingId ? { ...formData, id: editingId } : record
        )
      );
      alertDispatch({
        type: "setSuccess",
        message: "Record updated successfully",
      });
    } else {
      const newRecord: FinancialRecord = {
        ...formData,
        id: Date.now().toString(),
      };
      setRecords((prev) => [newRecord, ...prev]);
      alertDispatch({
        type: "setSuccess",
        message: "Record created successfully",
      });
    }

    handleCloseDialog();
  };

  const handleDeleteRecord = (id: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      // TODO: Replace with actual API call
      setRecords((prev) => prev.filter((record) => record.id !== deleteConfirmId));
      alertDispatch({
        type: "setSuccess",
        message: "Record deleted successfully",
      });
    }
    setDeleteConfirmDialogOpen(false);
    setDeleteConfirmId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmDialogOpen(false);
    setDeleteConfirmId(null);
  };

  // Group records by date and sort in descending order
  const monthRecords = getRecordsForMonth(selectedMonth);
  const groupedRecords: GroupedRecords = monthRecords.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {} as GroupedRecords);

  const sortedDates = Object.keys(groupedRecords).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return `HK$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Fragment>
      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Typography variant="h3">Financing</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ backgroundColor: "#1976d2" }}
          >
            Add Record
          </Button>
        </Box>

        {/* Charts Section */}
        <Card sx={{ marginBottom: 4, boxShadow: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <IconButton onClick={handlePreviousMonth} size="small">
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: "bold", minWidth: 150, textAlign: "center" }}>
                {formatMonthYear(selectedMonth)}
              </Typography>
              <IconButton onClick={handleNextMonth} size="small">
                <ChevronRightIcon />
              </IconButton>
            </Box>

            <Grid container spacing={4}>
              {/* Income Pie Chart */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center", color: "#4caf50" }}>
                  Income Breakdown
                </Typography>
                {calculateChartData("income").length > 0 ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PieChart
                      series={[
                        {
                          data: calculateChartData("income"),
                          cx: 100,
                          cy: 100,
                          innerRadius: 40,
                          outerRadius: 100,
                        },
                      ]}
                      width={250}
                      height={250}
                      slotProps={{
                        legend: { hidden: false, position: "bottom" as const },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ textAlign: "center", padding: 2 }}>
                    No income records for this month
                  </Typography>
                )}
              </Grid>

              {/* Expenditure Pie Chart */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center", color: "#f44336" }}>
                  Expenditure Breakdown
                </Typography>
                {calculateChartData("expenditure").length > 0 ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PieChart
                      series={[
                        {
                          data: calculateChartData("expenditure"),
                          cx: 100,
                          cy: 100,
                          innerRadius: 40,
                          outerRadius: 100,
                        },
                      ]}
                      width={250}
                      height={250}
                      slotProps={{
                        legend: { hidden: false, position: "bottom" as const },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ textAlign: "center", padding: 2 }}>
                    No expenditure records for this month
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Records Section */}

        {sortedDates.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", padding: 4 }}>
            No records found. Click "Add Record" to create one.
          </Typography>
        ) : (
          <Stack spacing={3}>
            {sortedDates.map((date) => (
              <Box key={date}>
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
                  {formatDate(date)}
                </Typography>

                <Stack spacing={2}>
                  {groupedRecords[date].map((record) => (
                    <Card
                      key={record.id}
                      sx={{
                        boxShadow: 2,
                        transition: "transform 0.2s, boxShadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 4,
                        },
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                              {record.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color:
                                  record.type === "income"
                                    ? "#4caf50"
                                    : "#f44336",
                                fontWeight: "600",
                                display: "block",
                                marginTop: 0.5,
                              }}
                            >
                              {record.subType}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{ marginTop: 1 }}
                            >
                              {record.description}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Typography
                              variant="h6"
                              sx={{
                                color:
                                  record.type === "income"
                                    ? "#4caf50"
                                    : "#f44336",
                                fontWeight: "bold",
                                textAlign: "right",
                              }}
                            >
                              {record.type === "income" ? "+" : "-"}
                              {formatCurrency(record.value)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ display: "block", textAlign: "right", marginTop: 0.5 }}
                            >
                              {record.type === "income"
                                ? "Income"
                                : "Expenditure"}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleOpenDialog(record)}
                                sx={{ color: "#1976d2" }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  record.id && handleDeleteRecord(record.id)
                                }
                                sx={{ color: "#f44336" }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>

                <Divider sx={{ marginTop: 3 }} />
              </Box>
            ))}
          </Stack>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingId ? "Edit Record" : "Add New Record"}
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              fullWidth
              required
              select
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expenditure">Expenditure</MenuItem>
            </TextField>
            <TextField
              label="Sub Type"
              name="subType"
              value={formData.subType}
              onChange={handleInputChange}
              fullWidth
              required
              select
            >
              {TYPE_SUBTYPES[formData.type].map((subType) => (
                <MenuItem key={subType} value={subType}>
                  {subType}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Value (HKD)"
              name="value"
              type="number"
              value={formData.value}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ step: "0.01", min: "0" }}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSaveRecord}
              variant="contained"
              sx={{ backgroundColor: "#1976d2" }}
            >
              {editingId ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmDialogOpen}
          onClose={handleCancelDelete}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this record? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{ backgroundColor: "#f44336" }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fragment>
  );
};

export default FinancingPage;
