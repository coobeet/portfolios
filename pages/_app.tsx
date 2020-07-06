import React from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { Provider } from "react-redux"
import axios from "axios"
import Cookies from "js-cookie"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

import store from "store"
import { updateUser } from "store/userSlice"
import { theme, shield } from "utils"
import GoTo from "components/GoTo"

export default ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove server-side injected css
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    // Fetch global shared data
    const token = Cookies.get("token")
    if (token) {
      axios
        .get("/api/me", {
          baseURL: "http://localhost:3000",
        })
        .then((res) => {
          store.dispatch(updateUser(res.data.user))
        })
    }
  }, [])

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
          <GoTo />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  )
}
