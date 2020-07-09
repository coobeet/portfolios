import "utils/extensions"

import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { Provider } from "react-redux"
import axios from "axios"
import Cookies from "js-cookie"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

import store from "store"
import { createUser } from "store/userSlice"
import { theme, env } from "utils"
import MySpeedDial from "components/MySpeedDial"

export default ({ Component, pageProps, router }: AppProps) => {
  React.useEffect(() => {
    // Remove server-side injected css
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    // Fetch or load global shared data
    const token = Cookies.get("token")
    const userStr = localStorage.getItem("user")
    if (!userStr && token) {
      axios
        .get("/api/me", {
          baseURL: env.BASE_URL,
        })
        .then((res) => {
          store.dispatch(createUser(res.data.user))
        })
    } else if (userStr) {
      const user = JSON.parse(userStr)
      store.dispatch(createUser(user))
    }
  }, [])

  // Decide whether should show speed dial
  const speedDialHidden = ["/arkanoid/game"].includes(router.pathname)
    ? true
    : false

  return (
    <React.Fragment>
      <Head>
        <title>My App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <MySpeedDial hidden={speedDialHidden} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  )
}
