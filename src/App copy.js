// import logo from './logo.svg';
import "./App.css";
import { useFormik, Field } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  ToggleButtonGroup,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import { top100Films } from "./data";

function App() {
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
    validationSchema: validationSchema,
  });
  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          margin="normal"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)} // been touched && are there any error? has this field been touched, avoids showing error without the user doing anything
          helperText={formik.touched.firstName && formik.errors.firstName} // without Boolean it shows the msn
          onBlur={formik.handleBlur}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName} // without Boolean it shows the msn
          onBlur={formik.handleBlur}
        />
        <TextField
          id="email"
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email} // without Boolean it shows the msn
          onBlur={formik.handleBlur}
        />
        <Button type="submit" variant="outlined">
          Submit
        </Button>

        {({ submitForm, isSubmitting, touched, errors }) => (
          <Field
            name="autocomplete"
            multiple
            component={Autocomplete}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => (
              <MuiTextField
                {...params}
                error={touched["autocomplete"] && !!errors["autocomplete"]}
                helperText={touched["autocomplete"] && errors["autocomplete"]}
                label="Autocomplete"
                variant="outlined"
              />
            )}
          />
        )}
      </form>
    </div>
  );
}

export default App;
