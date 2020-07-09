import React from "react"
import { NextPage, GetServerSideProps } from "next"
import Router from "next/router"
import ErrorPage, { ErrorProps } from "next/error"

import { SECTIONS } from "pages/resumake"

type Props = {
  data?: any
  error?: ErrorProps
}

const SectionNamePage: NextPage<Props> = ({ error }) => {
  if (error) return <ErrorPage {...error} />

  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.res) {
    if (
      SECTIONS.some(
        (section) => section.name.toLowerCase() === ctx.query.sectionName
      )
    ) {
      ctx.res.writeHead(302, { Location: "/resumake" })
      ctx.res.end()
    } else {
      ctx.res.statusCode = 404
    }
  } else {
    Router.push("/resumake")
  }

  return {
    props: {
      error: {
        statusCode: 404,
      },
    },
  }
}

export default SectionNamePage
