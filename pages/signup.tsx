import React from "react"
import NextLink from "next/link"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Formik, FormikErrors } from "formik"
import { useDispatch } from "react-redux"

import Copyright from "components/Copyright"
import { signup } from "store/userSlice"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignUp() {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            username: "",
            fullName: "",
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors: FormikErrors<typeof values> = {}

            if (!values.username) {
              errors.username = "Required"
            }
            if (!values.fullName) {
              errors.fullName = "Required"
            }
            if (!values.email) {
              errors.email = "Required"
            }
            if (!values.password) {
              errors.password = "Required"
            }

            return errors
          }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            try {
              dispatch(signup({ ...values }))
            } catch (error) {
              const errors: any = {}
              errors.password = "Incorrect password"
              setErrors(errors)
              setSubmitting(false)
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                  />
                  <Typography>
                    {errors.username && touched.username && errors.username}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                  />
                  <Typography>
                    {errors.fullName && touched.fullName && errors.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Typography>
                    {errors.email && touched.email && errors.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <Typography>
                    {errors.password && touched.username && errors.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <NextLink href="/signin" passHref>
                    <Link variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
