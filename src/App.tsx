import {
  Typography,
  Box,
  Stack,
  Grid,
  Button,
  TextField,
  InputLabel,
} from "@mui/material";
import React from "react";
import "./App.css";
import { stackStyle } from "./stylefile";
import { Formik } from "formik";
import { object, string, number, date, InferType } from "yup";
interface initialProps {
  first_name: string;
  language: string;
  age: string;
  email: string;
}
function App() {
  const initialValues: initialProps = {
    first_name: "",
    language: "",
    age: "",
    email: "",
  };

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
      <Typography variant="h3">MUI + FORMIK + YUP</Typography>
      <Typography
        variant="h4"
        sx={{ fontSize: "32px", fontWeight: 600, lineHeight: "44px" }}
      >
        Student Profile
      </Typography>

      {/* <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values) => console.log("submitted")}
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
          console.log("🚀 ~ file: App.tsx ~ line 55 ~ App ~ touched", touched);
          console.log("🚀 ~ file: App.tsx ~ line 45 ~ App ~ errors", errors);
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
                    onChange={handleChange}
                    error={errors.first_name ? true : false}
                    helperText={errors.first_name}
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
                    sx={{ width: "550px" }}
                    onChange={handleChange}
                    error={errors.language ? true : false}
                    helperText={errors.language}
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
                    sx={{ width: "550px" }}
                    onChange={handleChange}
                    error={errors.age ? true : false}
                    helperText={errors.age}
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
                    sx={{ width: "550px" }}
                    placeholder="enter your email"
                    onChange={handleChange}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                  ></TextField>
                </Stack>
              </Grid>
              <Button type="submit" variant="contained">
                {" "}
                SUBMIT
              </Button>
            </Grid>
          );
        }}
      </Formik> */}

      <Grid container>
        {fields.map((item) => (
          <Grid xs={6}>
            <Stack direction={"column"}>
              <InputLabel sx={{ textAlign: "start", my: 1 }} htmlFor="email">
                {item.label}
              </InputLabel>
              <TextField
                name={item.name}
                id={item.name}
                select={item.type === "select"}
                sx={{ width: "550px" }}
              ></TextField>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
