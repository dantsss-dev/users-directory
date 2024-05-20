import { FormControl, MenuItem, Select } from "@mui/material";

export const FilterSelect = ({ value, setValue, options }) => {
  return (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
