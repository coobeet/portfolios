import React from "react"
import Router from "next/router"
import cookies from "next-cookies"
import { GetServerSideProps } from "next"
import { useSelector, useDispatch } from "react-redux"
import Button from "@material-ui/core/Button"

import { RootState } from "store"
import { signout } from "store/userSlice"
import { User } from "prisma"

type SignedInProps = {
  user: User | {}
  handleClick: any
}

const SignedIn: React.FC<SignedInProps> = ({ user, handleClick }) => {
  const userEmpty = Object.keys(user).length === 0

  return (
    <div>
      {userEmpty ? <h2>loading</h2> : <h2>welcome</h2>}
      <Button onClick={handleClick}>Sign out</Button>
    </div>
  )
}

const SignedOut = () => {
  const handleSigninClick = () => Router.push("/signin")

  const handleSignupClick = () => Router.push("/signup")

  return (
    <div>
      <h2>test</h2>
      <Button onClick={handleSigninClick}>Sign in</Button>
      <Button onClick={handleSignupClick}>Sign up</Button>
    </div>
  )
}

type Data = {
  hasToken: boolean
}

export default (props: any) => {
  const [hasToken, setHasToken] = React.useState((props as Data).hasToken)
  const { user } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const handleSignoutClick = () => {
    dispatch(signout())
    setHasToken(false)
  }

  return (
    <div>
      <h1>Index</h1>
      {hasToken ? (
        <SignedIn user={user} handleClick={handleSignoutClick} />
      ) : (
        <SignedOut />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
  return {
    props: {
      hasToken: Boolean(cookies(ctx).token),
    },
  }
}
