import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Paper,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import {
  registerAsPatient,
  registerAsPersonel,
} from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { RootState } from "../redux/store";
import Alert from "@mui/material/Alert";

function Register() {
  const { error } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "",
    },
  });

  function registerCallback() {
    window.location.replace("/login");
  }

  function onSubmit(data: any) {
    console.log(data);
    role === "Patient"
      ? dispatch(registerAsPatient(data))
      : dispatch(registerAsPersonel(data));

    return registerCallback();
  }

  const { role } = watch();

  return (
    <Paper elevation={3}>
      {error.registerMessage !== "" && (
        <Alert severity="error">{error.registerMessage}</Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
          <Typography sx={{ ml: 16 }} variant="h6" component="p">
            Register
          </Typography>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "email is required",
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            }}
            render={({ field }) => (
              <TextField
                label="Email"
                variant="outlined"
                sx={{ m: 1 }}
                {...field}
              />
            )}
          />
          {errors.email && errors.email.type === "pattern" && (
            <Alert severity="error">Email is invalid</Alert>
          )}
          {errors.email && (
            <Alert severity="error">{errors.email?.message}</Alert>
          )}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "password is required",

              minLength: {
                value: 8,
                message: "Minimum length is 8",
              },
            }}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                sx={{ m: 1 }}
                {...field}
              />
            )}
          />
          {errors.password && (
            <Alert severity="error">{errors.password?.message}</Alert>
          )}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                label="Name"
                type="text"
                variant="outlined"
                sx={{ m: 1 }}
                {...field}
              />
            )}
          />
          {errors.name && (
            <Alert severity="error">{errors.name?.message}</Alert>
          )}
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-select-small" sx={{ ml: 2 }}>
              Role
            </InputLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: "role is required" }}
              render={({ field }) => (
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Role"
                  {...field}
                >
                  <MenuItem value={"Patient"}>Patient</MenuItem>
                  <MenuItem value={"Personel"}>Personel</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          {errors.role && (
            <Alert severity="error">{errors.role?.message}</Alert>
          )}
        </Box>
        <Button
          variant="contained"
          type="submit"
          size="medium"
          startIcon={<DoneIcon />}
          disabled={error.message === ""}
          sx={{ ml: 10, mb: 3, mt: 3 }}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
}

export default Register;
