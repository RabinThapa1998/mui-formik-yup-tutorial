import {
  Typography,
  Box,
  Stack,
  Grid,
  Button,
  TextField,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import { stackStyle } from "./stylefile";
import { Formik } from "formik";
import { object, string, number, date, InferType } from "yup";
import axios from "axios";
import { api_url } from "./config/config";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
interface initialProps {
  first_name: string;
  language: string;
  age: string;
  email: string;
}
function App() {
  const init: initialProps = {
    first_name: "",
    language: "",
    age: "",
    email: "",
  };
  const [initialValues, setInitialValues] = useState<initialProps>(init);
  function getter() {
    return axios({
      url: api_url,
      method: "GET",
    });
  }
  const { data, isLoading, error, isError } = useQuery(["submit"], getter, {
    refetchOnWindowFocus: false,
    onSuccess: (api) => {
      setInitialValues(api.data);
    },
  });

  // useEffect(() => {
  //   getter();
  // }, []);

  let userSchema = object({
    first_name: string().required(),
    age: number().required().positive().integer(),
    language: string().required(),
    email: string().email().required(),
  });

  const fields = [
    {
      name: "first_name",
      label: "First Name",
      type: "text",
    },
    {
      age: "age",
      label: "Age",
      type: "text",
    },
    {
      email: "email",
      label: "Email",
      type: "select",
    },
  ];

  return (
    <Box className="App" maxWidth="1160px" mx="auto" border={1} height="100vh">
      {isLoading && <CircularProgress />}
      <Typography variant="h3">MUI + FORMIK + YUP</Typography>
      <Typography
        variant="h4"
        sx={{ fontSize: "32px", fontWeight: 600, lineHeight: "44px" }}
      >
        Student Profile
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        validateOnMount={false}
        enableReinitialize
        onSubmit={async (values) => {
          const res = await axios.post(
            "https://submit.free.beeceptor.com/api/submit",
            values
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          // console.log("🚀 ~ file: App.tsx ~ line 55 ~ App ~ touched", touched);
          // console.log("🚀 ~ file: App.tsx ~ line 45 ~ App ~ errors", errors);
          return (
            <Grid container component="form" onSubmit={handleSubmit}>
              <Grid xs={6}>
                <Stack direction={"column"}>
                  <InputLabel
                    sx={{ textAlign: "start", my: 1 }}
                    htmlFor="first_name"
                  >
                    FirstName
                  </InputLabel>
                  <TextField
                    id="first_name"
                    name={"first_name"}
                    sx={{ width: "550px" }}
                    value={values.first_name}
                    onChange={handleChange}
                    error={
                      touched.first_name && errors.first_name ? true : false
                    }
                    helperText={touched.first_name && errors.first_name}
                  ></TextField>
                </Stack>
              </Grid>
              <Grid xs={6}>
                <Stack direction={"column"}>
                  <InputLabel
                    sx={{ textAlign: "start", my: 1 }}
                    htmlFor="language"
                  >
                    Language
                  </InputLabel>
                  <TextField
                    id="language"
                    name={"language"}
                    value={values.language}
                    sx={{ width: "550px" }}
                    onChange={handleChange}
                    error={touched.language && errors.language ? true : false}
                    helperText={touched.language && errors.language}
                  ></TextField>
                </Stack>
              </Grid>
              <Grid xs={6}>
                <Stack direction={"column"}>
                  <InputLabel sx={{ textAlign: "start", my: 1 }} htmlFor="age">
                    Age
                  </InputLabel>
                  <TextField
                    id="age"
                    name="age"
                    value={values.age}
                    sx={{ width: "550px" }}
                    onChange={handleChange}
                    error={touched.age && errors.age ? true : false}
                    helperText={touched.age && errors.age}
                  ></TextField>
                </Stack>
              </Grid>
              <Grid xs={6}>
                <Stack direction={"column"}>
                  <InputLabel
                    sx={{ textAlign: "start", my: 1 }}
                    htmlFor="email"
                  >
                    Email
                  </InputLabel>
                  <TextField
                    name="email"
                    id="email"
                    value={values.email}
                    sx={{ width: "550px" }}
                    placeholder="enter your email"
                    onChange={handleChange}
                    error={touched.email && errors.email ? true : false}
                    helperText={touched.email && errors.email}
                  ></TextField>
                </Stack>
              </Grid>
              <Button type="submit" variant="contained">
                SUBMIT
              </Button>
            </Grid>
          );
        }}
      </Formik>
    </Box>
  );
}

export default App;

// <Grid container>
//   {fields.map((item) => (
//     <Grid xs={6}>
//       <Stack direction={"column"}>
//         <InputLabel sx={{ textAlign: "start", my: 1 }} htmlFor="email">
//           {item.label}
//         </InputLabel>
//         <TextField
//           name={item.name}
//           id={item.name}
//           select={item.type === "select"}
//           sx={{ width: "550px" }}
//         ></TextField>
//       </Stack>
//     </Grid>
//   ))}
// </Grid>
