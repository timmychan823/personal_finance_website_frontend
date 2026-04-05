import { Fragment, useState, useEffect } from "react";
import { flushSync } from 'react-dom';
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
import {
  FinancialRecord,
  getFinancialRecords,
  createFinancialRecord,
  updateFinancialRecord,
  deleteFinancialRecord,
  getFinancialRecordsSum,
  SumRecord,
} from "services/FinancingService/financialRecordsService";

interface GroupedRecords {
  [date: string]: FinancialRecord[];
}

// Type to SubType mapping
const TYPE_SUBTYPES: Record<string, string[]> = {
  Income: [
    "Salary",
    "Dividend",
    "Capital Gain",
    "Interest",
    "Insurance Claim",
    "Freelance",
    "Bonus",
    "Other Income",
  ],
  Expenditure: [
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
  try {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [monthLoading, setMonthLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingRecord, setEditingRecord] = useState<FinancialRecord | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
    const [deleteConfirmRecord, setDeleteConfirmRecord] = useState<FinancialRecord | null>(null);
    const [sumOfRecords, setSumOfRecords] = useState<SumRecord[]>([]);
    const [formData, setFormData] = useState<Omit<FinancialRecord, 'id' | 'createdAt'>>({
      title: "",
      date: new Date().toISOString().split("T")[0],
      recordType: "Income",
      subType: "Salary",
      amount: 0,
      description: "",
    });

    const { alertDispatch } = useAlertContext();

    console.log("FinancingPage: Component rendering");
    console.log("FinancingPage: alertDispatch available:", !!alertDispatch);

    // Helper function to get records for the selected month
    const getRecordsForMonth = (month: Date) => {
      const year = month.getFullYear();
      const monthNum = month.getMonth();
      console.log("FinancingPage: Filtering records for year:", year, "month:", monthNum);
      console.log("FinancingPage: Total records available:", records.length);
      console.log("FinancingPage: All records:", records);

      const filteredRecords = records.filter((record) => {
        const recordDate = new Date(record.date);
        const recordYear = recordDate.getFullYear();
        const recordMonth = recordDate.getMonth();
        console.log("FinancingPage: Record date:", record.date, "parsed as:", recordDate, "year:", recordYear, "month:", recordMonth);

        const matches = recordYear === year && recordMonth === monthNum;
        console.log("FinancingPage: Record matches filter:", matches);

        return matches;
      });

      console.log("FinancingPage: Filtered records count:", filteredRecords.length);
      console.log("FinancingPage: Filtered records:", filteredRecords);
      return filteredRecords;
    };

    // Helper function to calculate pie chart data
    const calculateChartData = (type: "Income" | "Expenditure") => {
      console.log("FinancingPage: calculateChartData called for type:", type);
      const filteredSums = sumOfRecords.filter(s => s.type === type);
      console.log("FinancingPage: Filtered sums for type", type, ":", filteredSums);

      const chartData = filteredSums.map((sum, index) => ({
        id: index,
        value: sum.value,
        label: sum.subType,
      }));
      console.log("FinancingPage: Chart data for", type, ":", chartData);
      return chartData;
    };

    // Helper to calculate total value for a given type (Income or Expenditure)
    const calculateTotal = (type: "Income" | "Expenditure") => {
      const total = sumOfRecords
        .filter((s) => s.type === type)
        .reduce((acc, s) => acc + (parseFloat(s.value) || 0), 0);
      console.log("FinancingPage: Total for", type, ":", total);
      return total;
    };

    // Month navigation handlers
    const handlePreviousMonth = () => {
      console.log("FinancingPage: handlePreviousMonth called, current selectedMonth:", selectedMonth);
      const newMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
      console.log("FinancingPage: Switching to previous month:", newMonth.toLocaleDateString());
      setSelectedMonth(newMonth);
    };

    const handleNextMonth = () => {
      console.log("FinancingPage: handleNextMonth called, current selectedMonth:", selectedMonth);
      const newMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
      console.log("FinancingPage: Switching to next month:", newMonth.toLocaleDateString());
      setSelectedMonth(newMonth);
    };

    const formatMonthYear = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    };

    const fetchRecordSum = async () => {
      try {
        console.log("FinancingPage: Setting loading to true for sum fetch");
        setMonthLoading(true);
        // Fetch records sum for the selected month
        const options: Intl.DateTimeFormatOptions = {
          month: '2-digit', // "01"  
          day: '2-digit',   // "05"  
          year: 'numeric'   // "2024"  
        };
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        const startOfMonthStr = startOfMonth.toLocaleDateString('ja-JP', options).replace(/\//g, '-');
        const endOfMonthStr = endOfMonth.toLocaleDateString('ja-JP', options).replace(/\//g, '-');

        // Fetch sum for the month
        const sumResponse = await getFinancialRecordsSum(startOfMonthStr, endOfMonthStr);
        console.log("FinancingPage: Successfully fetched sum:", sumResponse.sum);
        setSumOfRecords(sumResponse.sum);
      } catch (error) {
        console.error("FinancingPage: Failed to fetch financial records sum:", error);
        alertDispatch({
          type: "setError",
          message: "Failed to load financial records summary",
        });
      } finally {
        console.log("FinancingPage: Setting loading to false");
        setMonthLoading(false);
      }
    };

    const fetchRecords = async () => {
      console.log("FinancingPage: Setting loading to true");
      setMonthLoading(true);
      try {
        // Fetch records for the selected month
        const options: Intl.DateTimeFormatOptions = {
          month: '2-digit', // "01"  
          day: '2-digit',   // "05"  
          year: 'numeric'   // "2024"  
        };
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        const startOfMonthStr = startOfMonth.toLocaleDateString('ja-JP', options).replace(/\//g, '-');
        const endOfMonthStr = endOfMonth.toLocaleDateString('ja-JP', options).replace(/\//g, '-');

        console.log("FinancingPage: Fetching records for month", selectedMonth.toLocaleDateString(), "from", startOfMonthStr, "to", endOfMonthStr);

        const response = await getFinancialRecords(
          { minDate: startOfMonthStr, maxDate: endOfMonthStr },
          1000, // large limit to get all
          1
        );
        console.log("FinancingPage: Successfully fetched records:", response.records.length, "records");
        setRecords(response.records);
        console.log("FinancingPage: Records set in state:", response.records);
      } catch (error) {
        console.error("FinancingPage: Failed to fetch financial records:", error);
        alertDispatch({
          type: "setError",
          message: "Failed to load financial records",
        });
      } finally {
        console.log("FinancingPage: Setting loading to false");
        setMonthLoading(false);
      }
    };


    useEffect(() => {
      console.log("FinancingPage: useEffect START - selectedMonth:", selectedMonth, "alertDispatch:", !!alertDispatch);
      console.log("FinancingPage: useEffect triggered, fetching records for month:", selectedMonth);
      fetchRecords();
      fetchRecordSum();
    }, [selectedMonth]);

    const handleOpenDialog = (record?: FinancialRecord) => {
      console.log("FinancingPage: handleOpenDialog called with record:", record);
      if (record) {
        console.log("FinancingPage: Editing existing record:", record.title);
        setFormData({
          title: record.title,
          date: record.date,
          recordType: record.recordType,
          subType: record.subType,
          amount: record.amount,
          description: record.description,
        });
        setEditingRecord(record);
      } else {
        console.log("FinancingPage: Creating new record");
        setFormData({
          title: "",
          date: new Date().toISOString().split("T")[0],
          recordType: "Income",
          subType: "Salary",
          amount: 0,
          description: "",
        });
        setEditingRecord(null);
      }
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
      setEditingRecord(null);
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
      const { name, value } = e.target as HTMLInputElement;
      const newValue = name === "amount" ? parseFloat(value as string) : (value as string);
      console.log("FinancingPage: handleInputChange - field:", name, "value:", value, "processed value:", newValue);

      setFormData((prev) => {
        const updated = {
          ...prev,
          [name]: newValue,
        };

        // When recordType changes, reset subType to the first available option
        if (name === "recordType") {
          console.log("FinancingPage: recordType changed to:", value, "resetting subType");
          updated.subType = TYPE_SUBTYPES[value as string][0];
        }

        console.log("FinancingPage: Updated formData:", updated);
        return updated;
      });
    };

    const handleSaveRecord = async () => {
      console.log("FinancingPage: handleSaveRecord called with formData:", formData);
      if (!formData.title || formData.amount <= 0 || !formData.date) {
        console.log("FinancingPage: Validation failed - missing required fields");
        alertDispatch({
          type: "setError",
          message: "Please fill in all required fields with valid values",
        });
        return;
      }

      try {
        if (editingRecord) {
          console.log("FinancingPage: Updating existing record:", editingRecord.createdAt);
          // Update existing record
          const updatedRecord = await updateFinancialRecord(
            editingRecord.createdAt!,
            formData
          );
          console.log("FinancingPage: Record updated successfully:", updatedRecord);
          await fetchRecordSum();
          await fetchRecords();
          alertDispatch({
            type: "setSuccess",
            message: "Record updated successfully",
          });
        } else {
          console.log("FinancingPage: Creating new record");
          // Create new record
          const newRecord = await createFinancialRecord(formData);
          console.log("FinancingPage: Record created successfully:", newRecord);
          await fetchRecordSum();
          await fetchRecords();
          alertDispatch({
            type: "setSuccess",
            message: "Record created successfully",
          });
        }

        handleCloseDialog();
      } catch (error) {
        console.error("FinancingPage: Error saving record:", error);
        alertDispatch({
          type: "setError",
          message: "Failed to save record",
        });
      }
    };

    const handleDeleteRecord = (record: FinancialRecord) => {
      console.log("FinancingPage: handleDeleteRecord called with record:", record.title, record.createdAt);
      setDeleteConfirmRecord(record);
      setDeleteConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
      console.log("FinancingPage: handleConfirmDelete called for record:", deleteConfirmRecord?.title);
      if (deleteConfirmRecord) {
        try {
          console.log("FinancingPage: Deleting record with createdAt:", deleteConfirmRecord.createdAt);
          await deleteFinancialRecord(deleteConfirmRecord.createdAt!);
          console.log("FinancingPage: Record deleted successfully");
          await fetchRecordSum();
          await fetchRecords();
          alertDispatch({
            type: "setSuccess",
            message: "Record deleted successfully",
          });
        } catch (error) {
          console.error("FinancingPage: Error deleting record:", error);
          alertDispatch({
            type: "setError",
            message: "Failed to delete record",
          });
        }
      }
      setDeleteConfirmDialogOpen(false);
      setDeleteConfirmRecord(null);
    };

    const handleCancelDelete = () => {
      setDeleteConfirmDialogOpen(false);
      setDeleteConfirmRecord(null);
    };

    // Group records by date and sort in descending order
    const monthRecords = getRecordsForMonth(selectedMonth);
    console.log("FinancingPage: Records for selected month:", monthRecords.length, "selectedMonth:", selectedMonth);
    console.log("FinancingPage: All records in state:", records);
    const groupedRecords: GroupedRecords = monthRecords.reduce((acc, record) => {
      const date = record.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {} as GroupedRecords);
    console.log("FinancingPage: Grouped records:", groupedRecords);

    const sortedDates = Object.keys(groupedRecords).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
    console.log("FinancingPage: Sorted dates:", sortedDates);

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

    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <Typography>Loading financial records...</Typography>
        </Box>
      );
    }

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
                <IconButton onClick={handlePreviousMonth} size="small" disabled={monthLoading}>
                  <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold", minWidth: 150, textAlign: "center" }}>
                  {monthLoading ? "Loading..." : formatMonthYear(selectedMonth)}
                </Typography>
                <IconButton onClick={handleNextMonth} size="small" disabled={monthLoading}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {monthLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 250 }}>
                  <Typography>Loading charts...</Typography>
                </Box>
              ) : (
                <Grid container spacing={4}>
                  {/* Income Pie Chart */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center", color: "#4caf50" }}>
                      Income Breakdown
                    </Typography>
                    {calculateChartData("Income").length > 0 ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <PieChart
                          series={[
                            {
                              data: calculateChartData("Income"),
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
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#4caf50", textAlign: "center" }}>
                        {"Total Income: " + (calculateTotal("Income") ? ("+" + formatCurrency(calculateTotal("Income"))) : formatCurrency(0))}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Expenditure Pie Chart */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center", color: "#f44336" }}>
                      Expenditure Breakdown
                    </Typography>
                    {calculateChartData("Expenditure").length > 0 ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <PieChart
                          series={[
                            {
                              data: calculateChartData("Expenditure"),
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
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#f44336", textAlign: "center" }}>
                        {"Total Expenditure: " + (calculateTotal("Expenditure") ? ("-" + formatCurrency(calculateTotal("Expenditure"))) : formatCurrency(0))}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* Records Section */}

          {monthLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
              <Typography>Loading records...</Typography>
            </Box>
          ) : sortedDates.length === 0 ? (
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
                        key={record.createdAt}
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
                                    record.recordType === "Income"
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
                                    record.recordType === "Income"
                                      ? "#4caf50"
                                      : "#f44336",
                                  fontWeight: "bold",
                                  textAlign: "right",
                                }}
                              >
                                {record.recordType === "Income" ? "+" : "-"}
                                {formatCurrency(record.amount)}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                                sx={{ display: "block", textAlign: "right", marginTop: 0.5 }}
                              >
                                {record.recordType === "Income"
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
                                    handleDeleteRecord(record)
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
              {editingRecord ? "Edit Record" : "Add New Record"}
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
                name="recordType"
                value={formData.recordType}
                onChange={handleInputChange}
                fullWidth
                required
                select
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expenditure">Expenditure</MenuItem>
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
                {TYPE_SUBTYPES[formData.recordType].map((subType) => (
                  <MenuItem key={subType} value={subType}>
                    {subType}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Amount (HKD)"
                name="amount"
                type="number"
                value={formData.amount}
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
                {editingRecord ? "Update" : "Create"}
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
  } catch (error) {
    console.error("FinancingPage: Error in component:", error);
    return <div>Error loading FinancingPage</div>;
  }
};

export default FinancingPage;
