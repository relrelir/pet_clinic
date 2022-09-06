import { Radio } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

const petTypes = ["Dog", "Cat", "Parrot"] as const;

export default function PetTipe({ petType, setPetType }) {
  return (
    <div>
      <FormControl className="w-[13rem]">
        <InputLabel id="petTypeLabel">Pet Type:</InputLabel>
        <Select
          onChange={(e) => setPetType(`${e.target.value}` as const)}
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
      </FormControl>
    </div>
  );
}
