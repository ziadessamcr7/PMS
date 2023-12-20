/** @format */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";

const DynamicInputs = ({ register, placeholder, value, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="my-4 text-warning ">
      {value !== "email" ? (
        <TextField
          id="input-with-icon-textfield"
          label={label}
          variant="standard"
          size="small"
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={true}
          {...register(value, {
            required: true,
            min: 6,
          })}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                {value !== "seed" ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ) : (
                  ""
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      ) : (
        <TextField
          id="input-with-icon-textfield"
          label={label}
          variant="standard"
          size="small"
          type={"text"}
          placeholder={placeholder}
          required={true}
          {...register(value, {
            required: true,
            min: 6,
          })}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            endAdornment: <InputAdornment position="end"></InputAdornment>,
          }}
          fullWidth
        />
      )}
    </div>
  );
};

export default DynamicInputs;
