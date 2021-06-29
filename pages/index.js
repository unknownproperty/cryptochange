import React from "react"
import clsx from 'clsx';
import Head from 'next/head'
import Image from 'next/image'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { Popper, Select, MenuItem, Button, Paper, InputBase, Divider, IconButton, Grid, makeStyles, useTheme, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.background,
  },
  rootGrid: {
    width: "100vw",
    height: "100vh",
  },
  centerGrid: {
    maxWidth: 800,
  },
  mainLabel: {
    cursor: "default",
    marginLeft: 4,
    fontSize: "50px",
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: "120%",
    color: theme.palette.darkGray,
  },
  secondLabel: {
    cursor: "default",
    marginLeft: 8,
    fontSize: "20px",
    marginBottom: 8,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  gridRootInput: {
    margin: 4,
  },
  gridRootInputSecond: {
    margin: 4,
  },
  rootInput: {
    zIndex: 9,
    padding: '2px 4px',
    // display: 'flex',
    // alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.lightGray,
    border: `2px solid ${theme.palette.brandColor}`,
  },
  rootInputSecond: {
    zIndex: 1,
    padding: '2px 4px',
    // display: 'flex',
    // alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.lightGray,
  },
  inputSecond: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "100%"
  },
  imgWrapper: {
    //marginTop: 6,
    marginTop: 4,
    padding: 6,
  },
  gridCentrIcon: {
    display: 'flex',
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "flex-end",
    },
  },
  CentrIcon: {
    color: theme.palette.brandColor,
    marginTop: 16,
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      transform: "rotate(90deg)",
    },
  },
  arrowIcon: {
    color: theme.palette.brandColor,
  },
  exchangeButton: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 8,
    },
    width: "100%",
    backgroundColor: theme.palette.brandColor,
    color: theme.palette.background,
    "&:hover": {
      backgroundColor: theme.palette.brandColor,
      color: theme.palette.background,
    }
  },
  uCryptoAdressLabel: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 128,
    },
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 8,
  },
  openSelect: {
    //position: "absolute",
    display: "block",
    overflowX: "hidden",
    overflowY: "auto",
    width: "inherit",
    maxHeight: 240,
    backgroundColor: theme.palette.lightGray,
    zIndex: 9,
  },
  itemRoot: {
    height: 48,
    width: "100%",
    cursor: "pointer",
  },
  rootInputGrid: {
    width: "100%",
  },
  row: {
    height: 64,
  },
  hidden: {
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  },
  ticker: {
    marginLeft: 2,
    marginRight: 2,
  },
  gridErrorLabel: {
    marginLeft: -64,
  },
  errorLabel: {
    color: "#E03F3F",
    fontSize: "10px",
  }
}));


export default function Home() {
  const classes = useStyles()
  const theme = useTheme();

  const [currencies, SetCurrencies] = React.useState(null)
  const [render, SetRender] = React.useState(false)


  React.useEffect(() => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://api.changenow.io/v1/currencies?active=true&fixedRate=true`, requestOptions)
      .then(response => response.json())
      .then(result => {
        SetCurrencies(result)
        SetRender(true)
      })
  }, [])

  const [uCryptoAdressValue, SetUCryptoAdressValue] = React.useState("")

  const [openLeftSelect, SetOpenLeftSelect] = React.useState(false)
  const [openRightSelect, SetOpenRightSelect] = React.useState(false)

  const [indexLeftSelect, SetIndexLeftSelect] = React.useState(0)
  const [indexRightSelect, SetIndexRightSelect] = React.useState(1)

  const [leftTicker, SetLeftTicker] = React.useState('btc')
  const [rightTicker, SetRightTicker] = React.useState('eth')

  const [leftValue, SetLeftValue] = React.useState('0')
  const [rightValue, SetRightValue] = React.useState('0')

  const [isError, SetIsError] = React.useState(false)
  const [min, SetMin] = React.useState('')


  const clickLeftItem = (index) => {
    SetIndexLeftSelect(index)
    SetOpenLeftSelect(false)
    SetLeftTicker(currencies[index].ticker)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`https://api.changenow.io/v1/min-amount/${currencies[index].ticker}_${rightTicker}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("left", result)
        SetLeftValue(result.minAmount)
        SetMin(result.minAmount)
        SetIsError(false)
      })
  }

  const clickRightItem = (index) => {
    SetIndexRightSelect(index)
    SetOpenRightSelect(false)
    SetRightTicker(currencies[index].ticker)
    SetRightValue('')
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`https://api.changenow.io/v1/min-amount/${leftTicker}_${currencies[index].ticker}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("right", result)
        SetLeftValue(result.minAmount)
        SetMin(result.minAmount)
        SetIsError(false)
      })
  }

  const ChangeLeftValue = (v) => {
    console.log("v", v)
    SetLeftValue(v)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log("leftValue", leftValue)
    if (v >= min) {
      fetch(`https://api.changenow.io/v1/exchange-amount/${v}/${leftTicker}_${rightTicker}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.estimatedAmount != null) {
            SetRightValue(result.estimatedAmount)
            SetIsError(false)
          } else {
            SetRightValue("-")
            SetIsError(true)
          }
        })
    } else {
      SetRightValue("-")
    }
  }

  return (
    <div>
      <Head>
        <title>Crypto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.root}>
        {render && <Grid
          className={classes.rootGrid}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid
            className={classes.centerGrid}
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography className={classes.mainLabel}>
              Crypto Exchange
            </Typography>
            <Typography className={classes.secondLabel}>
              Exchange fast and easy
            </Typography>
            <Grid
              className={classes.row}
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid
                className={classes.gridRootInput}
                xs={12} sm={12} md={5} lg={5} xl={5}
                item
                container
              >
                <Paper component="form" className={classes.rootInput}>
                  <Grid container
                    className={classes.rootInputGrid}
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <InputBase
                        type="number"
                        value={leftValue}
                        className={classes.input}
                        onChange={(event) => ChangeLeftValue(event.target.value)}
                        //placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'search google maps' }}
                      />
                      <Divider className={classes.divider} orientation="vertical" />
                      <Grid className={classes.imgWrapper}>
                        <Image alt="icon" width={24} height={24} src={currencies[indexLeftSelect].image} />
                      </Grid>
                      <Typography> {currencies[indexLeftSelect].ticker.toUpperCase()} </Typography>
                      <IconButton onClick={() => SetOpenLeftSelect(!openLeftSelect)} color="primary" className={classes.iconButton} aria-label="directions">
                        {!openLeftSelect && <KeyboardArrowDownIcon className={classes.arrowIcon} />}
                        {openLeftSelect && <CloseIcon className={classes.arrowIcon} />}
                      </IconButton>
                    </Grid>
                    {openLeftSelect && <Grid
                      container
                      direction="column"
                      className={classes.openSelect}
                    >
                      {currencies.map((item, index) => (
                        <div onClick={() => clickLeftItem(index)} key={index} className={classes.itemRoot}>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                            <Grid className={classes.imgWrapper}>
                              <Image alt="icon" width={24} height={24} src={item.image} />
                            </Grid>
                            <Typography className={classes.ticker}> {item.ticker.toUpperCase()} </Typography>
                            <Typography>{item.name}</Typography>
                          </Grid>
                        </div>
                      ))}
                    </Grid>}
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                xs={12} sm={12} md={1} lg={1} xl={1}
                item
                container
                className={clsx(classes.gridCentrIcon, { [classes.hidden]: openLeftSelect })}
              >
                <SyncAltIcon className={classes.CentrIcon} />
              </Grid>
              <Grid
                className={clsx(classes.gridRootInput, { [classes.hidden]: openLeftSelect })}
                xs={12} sm={12} md={5} lg={5} xl={5}
                item
                container
              >
                <Paper component="form" className={classes.rootInput}>
                  <Grid container
                    className={classes.rootInputGrid}
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <InputBase
                        //type="number"
                        readOnly={true}
                        value={rightValue}
                        className={classes.input}
                        onChange={(event) => SetRightValue(event.target.value)}
                        //placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'search google maps' }}
                      />
                      <Divider className={classes.divider} orientation="vertical" />
                      <Grid className={classes.imgWrapper}>
                        <Image alt="icon" width={24} height={24} src={currencies[indexRightSelect].image} />
                      </Grid>
                      <Typography> {currencies[indexRightSelect].ticker.toUpperCase()} </Typography>
                      <IconButton onClick={() => SetOpenRightSelect(!openRightSelect)} color="primary" className={classes.iconButton} aria-label="directions">
                        {!openRightSelect && <KeyboardArrowDownIcon className={classes.arrowIcon} />}
                        {openRightSelect && <CloseIcon className={classes.arrowIcon} />}
                      </IconButton>
                    </Grid>
                    {openRightSelect && <Grid
                      container
                      direction="column"
                      className={classes.openSelect}
                    >
                      {currencies.map((item, index) => (
                        <div onClick={() => clickRightItem(index)} key={index} className={classes.itemRoot}>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                            <Grid className={classes.imgWrapper}>
                              <Image alt="icon" width={24} height={24} src={item.image} />
                            </Grid>
                            <Typography className={classes.ticker}> {item.ticker.toUpperCase()} </Typography>
                            <Typography>{item.name}</Typography>
                          </Grid>
                        </div>
                      ))}
                    </Grid>}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Typography className={classes.uCryptoAdressLabel}>
              {`Your ${currencies[indexRightSelect].name} address`}
            </Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid
                className={classes.gridRootInputSecond}
                xs={12} sm={12} md={9} lg={9} xl={9}
                item
                container
              >
                <Paper component="form" className={classes.rootInputSecond}>
                  <InputBase
                    className={classes.inputSecond}
                    value={uCryptoAdressValue}
                    onChange={(event) => SetUCryptoAdressValue(event.target.value)}
                    //placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                </Paper>
              </Grid>
              <Grid
                className={classes.gridRootInput}
                xs={12} sm={12} md={2} lg={2} xl={2}
                item
                container
              >
                <Button variant="contained" className={classes.exchangeButton}>
                  Exchange
                </Button>
              </Grid>
            </Grid>
            {isError && <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className={classes.gridErrorLabel}
            >
              <Typography className={classes.errorLabel}>
                This pair is disabled now
              </Typography>
            </Grid>}
          </Grid>
        </Grid>}
      </main>
    </div>
  )
}

