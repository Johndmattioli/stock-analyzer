import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form } from "./form";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
 paper: {
   marginTop: theme.spacing.unit * 1,
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
     .spacing.unit * 5}px`
 },
 container: {
   maxWidth: "500px",
   justify: "center"
 }
});

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Enter your password"),
  confirmPassword: Yup.string().required("Confirm your password"),
});


class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const values = { name: "", email: "", confirmPassword: "", password: "" };
    return (
      <React.Fragment>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '70vh' }}
        >
          <Grid item xs={3}>
            <div className={classes.container}>
              <Paper elevation={5} className={classes.paper}>
                <h1>Stock Analyzer</h1>
                <Formik
                  render={props => <Form {...props} />}
                  initialValues={values}
                  validationSchema={validationSchema}
                />
              </Paper>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(InputForm);