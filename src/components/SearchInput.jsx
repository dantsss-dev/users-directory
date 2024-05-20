import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { GENDER, SEARCH_BY_OPTIONS, USER_STATUS } from "../constant/constants";

export const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchBy, setSearchBy] = useState(0);
  const [statusFilter, setStatusFilter] = useState(0);
  const [genderFilter, setGenderFilter] = useState(0);

  const dispatch = useDispatch();

  const onHandleSearchButton = () => {
    const searchByParam = `${SEARCH_BY_OPTIONS[searchBy]}=${searchInput}`;
    const statusFilterParam = `status=${USER_STATUS[statusFilter]}`;
    const genderFilterParam = `gender=${GENDER[genderFilter]}`;

    const finalParam = `${searchByParam}&${statusFilterParam}&${genderFilterParam}`;
    dispatch(fetchUsers(finalParam));
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: 1,
            borderColor: "primary",
            borderRadius: "12px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search user By"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Select
            value={searchBy}
            onChange={handleSearchByChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-root": {
                boxShadow: "none",
              },
            }}
          >
            <MenuItem value={0}>Name</MenuItem>
            <MenuItem value={1}>Email</MenuItem>
          </Select>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ color: "primary", borderColor: "primary" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={onHandleSearchButton}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent={"end"}
        alignItems={"end"}
        spacing={0}
        mt={1}
        mb={"24px"}
      >
        <Grid container item xs={4} md={2} justifyContent={"end"}>
          <FormControl sx={{ m: 1, width: "100%", maxWidth: "148px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              sx={{ width: "100%" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value={0}>Both</MenuItem>
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={2}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={2}>
          <FormControl sx={{ m: 1, width: "100%", maxWidth: "148px" }}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              fullWidth
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <MenuItem value={0}>Both</MenuItem>
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchInput;
