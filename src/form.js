import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';


export const Form = props => {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [typedValue, setTypedValue] = React.useState([]);
  const loading = open && options!== undefined && options.length === 0;

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const onChangeHandle = async value => {
    // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions 
      if (!value && value !==undefined) {
        setOpen(false);
        setOptions([]);
      } else {
        console.log(value);
    
        const res = await axios.get('https://www.alphavantage.co/query', { params: { function: 'SYMBOL_SEARCH',  apikey : '4LAC1O82H3X0V7IZ', keywords: value} });
    
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
    values: { name, email, password, confirmPassword },
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
      onSubmit={() => {
        alert("submitted");
      }}
    >
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
        getOptionLabel={(option) => option["1. symbol"]}
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
      <TextField
        id="price"
        name="price"
        helperText={touched.name ? errors.name : ""}
        error={touched.name && Boolean(errors.name)}
        label="Price"
        value={name}
        onChange={change.bind(null, "name")}
        fullWidth

      />
      <Button
        type="submit"
        fullWidth
        variant="raised"
        color="primary"
        disabled={!(isValid && dirty)}
      >
        Submit
      </Button>
    </form>
  );
};
