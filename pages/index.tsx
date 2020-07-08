import React from "react"
import { NextPage } from "next"
import Router from "next/router"
import cookies from "next-cookies"
import { GetServerSideProps } from "next"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import { RootState } from "store"
import { signedIn, signout } from "store/userSlice"

type Portfolio = {
  title: string
  content: string
}

const portfolios: Portfolio[] = [
  { title: "Todos", content: "Todos" },
  { title: "Calculator", content: "Calculator" },
  { title: "Arkanoid", content: "Arkanoid" },
  { title: "Resumake", content: "Resumake" },
]

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    padding: 32,
  },
})

const HomePage: NextPage<{ ssrHasToken?: boolean }> = ({ ssrHasToken }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state)
  const [hasToken, setHasToken] = React.useState(ssrHasToken)
  const disabledCards = signedIn(user) ? [] : [0, 3]

  const handleSigninClick = () => {
    Router.push("/signin")
  }

  const handleSignupClick = () => {
    Router.push("/signup")
  }

  const handleSignoutClick = () => {
    dispatch(signout())
    setHasToken(false)
  }

  const handleCardClick = (index: number) => {
    Router.push(`/${portfolios[index].title.toLowerCase()}`)
  }

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={6}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {portfolios.map((portfolio, index) => (
              <Grid key={portfolio.title} item xs={12} sm={6} lg={3}>
                <Card>
                  <CardActionArea
                    onClick={() => handleCardClick(index)}
                    disabled={disabledCards.includes(index)}
                  >
                    <CardMedia
                      image={`/logo.svg`}
                      title="Portfolio Image"
                      style={{ minHeight: 240 }}
                    />
                    <CardContent style={{ minHeight: 160 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {portfolio.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {portfolio.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            {hasToken ? (
              <React.Fragment>
                <Grid item>
                  <Typography>Welcome,</Typography>
                </Grid>
                {signedIn(user) ? (
                  <Grid item>
                    <Typography color="secondary">{user.fullName}</Typography>
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography>loading...</Typography>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSignoutClick}
                  >
                    Sign out
                  </Button>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSigninClick}
                  >
                    Sign in
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSignupClick}
                  >
                    Sign up
                  </Button>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

type HomePageSSRProps = {
  ssrHasToken: boolean
}

export const getServerSideProps: GetServerSideProps<HomePageSSRProps> = async (
  ctx
) => {
  return {
    props: {
      ssrHasToken: Boolean(cookies(ctx).token),
    },
  }
}

export default HomePage
