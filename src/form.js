import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';
import { Grid, TextField, Button, Card, CardContent, Typography, CircularProgress,Box } from '@material-ui/core';


export const Form = props => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options !== undefined && options.length === 0;
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onChangeHandle = async value => {
    // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions 
    if (!value && value !== undefined) {
      setOpen(false);
      setOptions([]);
    } else {
      console.log(value);
      const res = await axios.get('https://www.alphavantage.co/query', { params: { function: 'SYMBOL_SEARCH', apikey: '4LAC1O82H3X0V7IZ', keywords: value } });
      const tickers = await res.data.bestMatches;

      setOptions(tickers);
    }

  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const {
    values: { rvnGrwth, prftMrgn, shrCng, fcfRvn, pe, priceFcf, rtrn },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    dirty,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
      }}
    >
      <Grid>
      <Box m={1} p={2}/>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Stock Analyzer
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Fill up the form to determine if you're headed to the truck stop!
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Autocomplete
                    id="ticker"
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) => (option["1. symbol"]) === value["1. symbol"]}
                    getOptionLabel={(option) => option["1. symbol"] + " - " + option["2. name"]}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ticker Symbol"
                        onChange={ev => {
                          // dont fire API if the user delete or not entered anything
                          if (ev.target.value !== "" || ev.target.value !== null) {
                            onChangeHandle(ev.target.value);
                          }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="rvnGrwth"
                    name="rvnGrwth"
                    helperText={touched.rvnGrwth ? errors.rvnGrwth : ""}
                    error={touched.rvnGrwth && Boolean(errors.rvnGrwth)}
                    label="Revenue Growth (%)"
                    value={rvnGrwth}
                    onChange={change.bind(null, "rvnGrwth")}
                    fullWidth

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="prftMrgn"
                    name="prftMrgn"
                    helperText={touched.prftMrgn ? errors.prftMrgn : ""}
                    error={touched.prftMrgn && Boolean(errors.prftMrgn)}
                    label="Profit Margin (%)"
                    value={prftMrgn}
                    onChange={change.bind(null, "prftMrgn")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="shrCng"
                    name="shrCng"
                    helperText={touched.shrCng ? errors.shrCng : ""}
                    error={touched.shrCng && Boolean(errors.shrCng)}
                    label="Share Change (%)"
                    value={shrCng}
                    onChange={change.bind(null, "shrCng")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="fcfRvn"
                    name="fcfRvn"
                    helperText={touched.fcfRvn ? errors.fcfRvn : ""}
                    error={touched.fcfRvn && Boolean(errors.fcfRvn)}
                    label="Free Cash Flow Revenue (%)"
                    value={fcfRvn}
                    onChange={change.bind(null, "fcfRvn")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="pe"
                    name="pe"
                    helperText={touched.pe ? errors.pe : ""}
                    error={touched.pe && Boolean(errors.pe)}
                    label="P/E"
                    value={pe}
                    onChange={change.bind(null, "pe")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="priceFcf"
                    name="priceFcf"
                    helperText={touched.priceFcf ? errors.priceFcf : ""}
                    error={touched.priceFcf && Boolean(errors.priceFcf)}
                    label="P/FCF"
                    value={priceFcf}
                    onChange={change.bind(null, "priceFcf")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="rtrn"
                    name="rtrn"
                    helperText={touched.rtrn ? errors.rtrn : ""}
                    error={touched.rtrn && Boolean(errors.rtrn)}
                    label="Desired Annual Return"
                    value={rtrn}
                    onChange={change.bind(null, "rtrn")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    disabled={!(isValid && dirty)}
                  >
                    Submit
                  </Button>
                </Grid>

              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {isSubmitted && "Your Target Stock Price Is"}
      {isSubmitted && <h1 style={{ color: 'red' }}> 22</h1>}
    </form>
  );
};
