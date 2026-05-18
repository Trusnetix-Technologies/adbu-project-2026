import { loginUser, registerUser } from "@/redux/actions/authAction";
import { fetchCurrentUser, selectUserAuth } from "@/redux/reducers/authReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, userAuthData } = useSelector(selectUserAuth);

  const isAuthenticated = !!userAuthData;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginUser({ email: formData.email, password: formData.password });
        setSuccess("Login successful! Redirecting...");
        dispatch(fetchCurrentUser());
        router.push("/");
      } else {
        await registerUser(formData);
        setSuccess("Registration successful! You can now log in.");
        if (!error) {
          setIsLogin(true);
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
      console.error("Error during authentication:", error);
    }
  };

  // So i created this error and success states.
  // used this error state instead if using the error from authreducer because we dont have the login/register actions in reducers.
  // error and success states
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <>
      <Head>
        <title>{isLogin ? "Login" : "Register"}</title>
      </Head>
      <Box
        sx={{
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, borderRadius: "24px" }}>
            <Typography variant="h4" align="center" gutterBottom>
              {isLogin ? "Login" : "Register"}
            </Typography>

            <Typography variant="body2" align="center">
              {isLogin
                ? "Welcome back to My Movies"
                : "Create an account to get started!"}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 2, width: "100%" }}
            >
              <Stack spacing={2}>
                {!isLogin && (
                  <TextField
                    name="name"
                    label="Name"
                    type="text"
                    required
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}
                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                {success && (
                  <Typography color="primary" variant="body2">
                    {success}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading === "loading"}
                >
                  {loading === "loading"
                    ? "Processing..."
                    : isLogin
                      ? "Login"
                      : "Register"}
                </Button>

                <Box textAlign="center">
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? "Don't have an account? Register here."
                      : "Already have an account? Login here."}
                  </Link>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
