import React from "react";
import emailjs from "@emailjs/browser";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/auth/authSlice";
import { toast } from "react-toastify";

const sendEmailSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Required"),
  message: yup.string().required("Required"),
});

const SendEmail = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { email, firstName, lastName } = useSelector(selectUser) || {};
  const initialSendEmailValues = {
    name: Boolean(firstName) ? `${firstName} ${lastName}` : "",
    email: email || "",
    message: "",
  };

  const sendEmail = async (values, onSubmitProps) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        values,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      onSubmitProps.resetForm();
      toast.success("Message sent successfully.");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Formik
      onSubmit={sendEmail}
      initialValues={initialSendEmailValues}
      validationSchema={sendEmailSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} id="send-email">
          <Box
            display="grid"
            gap="30px"
            marginTop="1.5rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              required
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              required
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              label="Message"
              rows={4}
              onBlur={handleBlur}
              onChange={handleChange}
              required
              value={values.message}
              name="message"
              multiline
              error={Boolean(touched.message) && Boolean(errors.message)}
              helperText={touched.message && errors.message}
              sx={{ gridColumn: "span 12" }}
            />
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Send
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SendEmail;
