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
  rvnGrwth: Yup.number().typeError('Revenue Growth Must Be A Number').max(100, "Revenue Growth Can't Exceed 100").required("Revenue Growth is required"),
  prftMrgn: Yup.number().typeError('Profit Margin Must Be A Number').max(100, "Profit Margin Can't Exceed 100 Percent").required("Profit Margin is required"),
  shrCng: Yup.number().typeError('Share Change Must Be A Number').max(100, "Share Change Can't Exceed 100 Percent").required("Share change is required"),
  fcfRvn: Yup.number().typeError('Free Cash Flow Revenue Must Be A Number').max(100, "Free Cash Flow Revenue Can't Exceed 100 Percent").required("Free Cash Flow Revenue is required"),
  pe: Yup.number().typeError('PE Ratio Must Be A Number').required("PE Ratio is required"),
  priceFcf: Yup.number().typeError('Price To Free Cash Flow Must Be A Number').required("Price to Free Cash Flow is required"),
  rtrn: Yup.number().typeError('Desired Return Must Be A Number').max(100, "Desired Return Can't Exceed 100 Percent... What Are You Meatspin Kevin?").required("Desired Rate Of Return is Required"),
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const values = { rvnGrwth: "", prftMrgn: "", shrCng: "",  fcfRvn:"", pe:"", priceFcf:"", rtrn:"" };
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
                  keepDirtyOnReinitialize 
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