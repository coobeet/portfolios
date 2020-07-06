import React from "react"
import { NextPage, NextPageContext } from "next"
import Router from "next/router"
import cookies from "next-cookies"

type CheckAuthorization = (arg: {
  rules: string[]
  ctx: NextPageContext
}) => { [rule: string]: boolean }

const checkAuthorization: CheckAuthorization = ({ rules, ctx }) => {
  const auth: { [rule: string]: boolean } = {}
  const MAP: any = {
    user: {
      signedIn: (arg: string) => Boolean(cookies(ctx).token),
      isAdult: (arg: string) => true,
    },
    todos: {
      moreThan: (arg: string) => false,
      lessThan: (arg: string) => true,
    },
  }

  for (const rule of rules) {
    const keys = rule.split(".")
    let fn = MAP

    for (const key of keys) {
      if (fn[key]) fn = fn[key]
    }

    auth[rule] = fn(keys[keys.length - 1])
  }

  return { ...auth }
}

type Shield = (
  fallback?: string,
  rules?: string[]
) => (WrappedPage: NextPage) => NextPage

export const shield: Shield = (fallback = "/", rules = ["user.signedIn"]) => (
  WrappedPage
) => {
  const WrapperPage: NextPage = ({ ...props }) => <WrappedPage {...props} />

  WrapperPage.getInitialProps = async (ctx) => {
    const wrappedProps = WrappedPage.getInitialProps
      ? await WrappedPage.getInitialProps(ctx)
      : {}
    const result = checkAuthorization({ rules, ctx })
    const authorized = Object.values(result).every((value) => Boolean(value))

    return {
      ...wrappedProps,
      authorized,
      fallback,
    }
  }

  return WrapperPage
}

export const useShield = ({
  authorized,
  fallback,
}: {
  authorized: boolean
  fallback: string
}) => {
  React.useEffect(() => {
    if (!authorized) Router.push(fallback)
  }, [])

  return { authorized, fallback }
}
