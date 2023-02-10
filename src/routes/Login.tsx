import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { loginInUser } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: any) {
    dispatch(loginInUser(data));
    navigate("/")
  }

  const {error} = useSelector((state:RootState) => state.users)

  return (
    <Box>
      <Typography sx={{ marginTop: 10 }} variant="h6" component="p">
        Welcome to Heath Management Systems App. Dont have an account?{" "}
        <Link to="/register">click here </Link> {' '}| login below if you already
        have an account
      </Typography>
      <Paper elevation={3} sx={{ pb: 2 }}>
      {error.loginMessage !== "" && (<Alert severity="error">{error.loginMessage}</Alert>)}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
            <Typography sx={{ textAlign: "center" }} variant="h6" component="p">
              Login
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "email is required or invalid email",
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

            {errors.email && <Alert severity="error">{errors.email?.message}</Alert>}

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
            {errors.password && <Alert severity="error">{errors.password?.message}</Alert>}
            <Button variant="contained" type="submit" sx={{ m: 1, p: 2 }}>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
