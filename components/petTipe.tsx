import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import pageContext from "../contexts/pageContext";
import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const petTypes = ["Dog", "Cat", "Parrot"];

export default function PetTipe({ petType, setPetType }) {

  return (
    <div>
      <FormControl className="w-[13rem]">
        <InputLabel id="petTypeLabel">Pet Type:</InputLabel>
        <Select
          onChange={(e) => setPetType(e.target.value)}
          value={petType}
          input={<OutlinedInput label="Pet Type" />}
          renderValue={(v) => v}
        >
          {petTypes.map((pt, index) => (
            <MenuItem key={index} value={pt}>
              <Radio checked={pt === petType} />
              <ListItemText primary={pt} />
            </MenuItem>
          ))}
        </Select>
        {/* <Select
          labelId="petType"
          id="petType"
          defaultValue={petType}
          input={<OutlinedInput label="PetTypes" />}
        >
          <RadioGroup
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: string
            ) => setPetType(event.target.value)}
            id="petType"
            aria-labelledby="petType"
            name="petType"
          >
            {petTypes.map((pt, index) => (
              <Box key={index} className="flex ml-4">
                <FormControlLabel value={pt} control={<Radio />} label={pt} />
                <MenuItem value={pt}>{pt}</MenuItem>
              </Box>

            
            ))}
          </RadioGroup>
        </Select> */}
      </FormControl>
    </div>
  );
}
