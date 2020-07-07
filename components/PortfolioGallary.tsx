import React from "react"
import Router from "next/router"
import { useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"

import { RootState } from "store"
import { signedIn } from "store/userSlice"

const useStyles = makeStyles({
  root: {},
  card: {},
  media: {},
})

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

type PortfolioCardProps = {
  portfolio: Portfolio
  disabled: boolean
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  disabled,
}) => {
  const classes = useStyles()
  const [route, image] = [`/${portfolio.title.toLowerCase()}`, `/logo.svg`]

  const handleClick = () => {
    Router.push(route)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick} disabled={disabled}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {portfolio.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {portfolio.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const PortfolioGallary: React.FC = () => {
  const classes = useStyles()
  const { user } = useSelector((state: RootState) => state)
  const disabledCards = signedIn(user) ? [] : [0, 3]

  return (
    <div className={classes.root}>
      {portfolios.map((portfolio, index) => (
        <PortfolioCard
          key={portfolio.title}
          portfolio={portfolio}
          disabled={disabledCards.includes(index)}
        />
      ))}
    </div>
  )
}

export default PortfolioGallary
