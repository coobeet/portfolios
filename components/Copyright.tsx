import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

export default () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.github.com/bttyfrank">
        bttyfrank
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
