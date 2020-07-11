import React from "react"
import { NextPage } from "next"
import Router from "next/router"
import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  Grid,
  Hidden,
  Tabs,
  Tab,
  Typography,
  Button,
  ButtonGroup,
  LinearProgress,
  IconButton,
  Paper,
  Box,
} from "@material-ui/core"
import {
  GetApp,
  ZoomIn,
  ZoomOut,
  Print,
  ArrowLeft,
  ArrowRight,
} from "@material-ui/icons"

import { shield, useShield } from "utils"
import HomePage from "pages/index"
import {
  ResumeType,
  initialResumeState,
  TemplatesComponent,
  ProfileComponent,
  EducationComponent,
  ExperienceComponent,
  SkillsComponent,
  ProjectsComponent,
  AwardsComponent,
} from "components/ResumeComponents"
import { theme } from "utils"

export const SECTIONS = [
  { name: "Templates", component: TemplatesComponent },
  { name: "Profile", component: ProfileComponent },
  { name: "Education", component: EducationComponent },
  { name: "Experience", component: ExperienceComponent },
  { name: "Skills", component: SkillsComponent },
  { name: "Projects", component: ProjectsComponent },
  { name: "Awards", component: AwardsComponent },
]

const a11yProps = (index: number) => {
  const key = SECTIONS[index].name.toLowerCase() as keyof ResumeType
  return initialResumeState[key]
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    width: "100vw",
    background: theme.palette.background.paper,
  },
  header: {
    flex: "0 0 64px",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  main: {
    flex: "1 1 auto",
    overflow: "hidden",
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  footer: {
    flex: "0 0 64px",
  },
  middle: {
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}))

type ResumakePageProps = {
  authorized: boolean
  fallback: string
}

export const ResumakePage: NextPage<ResumakePageProps> = ({
  authorized,
  fallback,
}) => {
  useShield({ authorized, fallback })
  if (!authorized) return <HomePage />

  const classes = useStyles()
  const isMountedRef = React.useRef<boolean>(false)

  const [value, setValue] = React.useState<number>(0)
  React.useEffect(() => {
    const pathname = `/resumake/${SECTIONS[value].name.toLowerCase()}`
    Router.replace("/resumake", pathname, { shallow: true })
  }, [value])
  const Section = SECTIONS[value].component

  const [resume, setResume] = React.useState<ResumeType>(initialResumeState)
  React.useEffect(() => {
    const resumeStr = localStorage.getItem("resume")
  }, [])

  React.useEffect(() => {
    if (isMountedRef.current) {
      console.log("save")
      localStorage.setItem("resume", JSON.stringify(resume))
    } else {
      isMountedRef.current = true
    }
  }, [resume])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue)
  }

  return (
    <Grid container direction="column" wrap="nowrap" className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        component="header"
        className={classes.header}
      >
        <Typography variant="h4">resu</Typography>
        <Typography variant="h4" color="secondary">
          make
        </Typography>
      </Grid>
      <Grid container component="main" className={classes.main}>
        <Hidden smDown>
          <Grid item md={2}>
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Resumake nav bar"
            >
              {SECTIONS.map((section) => (
                <Tab key={section.name} label={section.name} />
              ))}
            </Tabs>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: 32 }}
            >
              <Button variant="outlined" color="primary" style={{ width: 128 }}>
                MAKE
              </Button>
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={4} direction="column" className={classes.middle}>
          {/* @ts-ignore */}
          <Section {...a11yProps(value)} />
        </Grid>
        <Hidden smDown>
          <Grid item md={6} style={{ height: "100%", overflow: "auto" }}>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ height: 48 }}
            >
              <Grid container justify="center" xs={1}>
                <Button color="primary" size="small">
                  PDF
                </Button>
              </Grid>
              <Grid container justify="center" xs={1}>
                <Button color="primary" size="small">
                  LaTax
                </Button>
              </Grid>
              <Grid container justify="center" xs={1}>
                <Button color="primary" size="small">
                  JSON
                </Button>
              </Grid>
              <Grid container justify="center" xs={2}>
                <IconButton color="primary" size="small">
                  <ArrowLeft />
                </IconButton>
              </Grid>
              <Grid container justify="center" xs={2}>
                <Typography>Page 1</Typography>
              </Grid>
              <Grid container justify="center" xs={2}>
                <IconButton color="primary" size="small">
                  <ArrowRight />
                </IconButton>
              </Grid>
              <Grid container justify="center" xs={1}>
                <IconButton color="primary" size="small">
                  <ZoomOut />
                </IconButton>
              </Grid>
              <Grid container justify="center" xs={1}>
                <IconButton color="primary" size="small">
                  <ZoomIn />
                </IconButton>
              </Grid>
              <Grid container justify="center" xs={1}>
                <IconButton color="primary" size="small">
                  <Print />
                </IconButton>
              </Grid>
            </Grid>
            <Box
              style={{
                padding: 16,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Paper style={{ minHeight: 800 }}>Paper</Paper>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        component="footer"
        className={classes.footer}
      >
        <Button
          variant="contained"
          color="secondary"
          disabled={value === 0}
          onClick={() => {
            setValue(value - 1)
          }}
        >
          Prev
        </Button>
        <Hidden smDown>
          <LinearProgress
            variant="determinate"
            value={(100 / SECTIONS.length) * (value + 1)}
            style={{ width: 640 }}
          />
        </Hidden>
        <Hidden mdUp>
          <Button variant="outlined" color="primary" style={{ width: 128 }}>
            MAKE
          </Button>
        </Hidden>
        <Button
          variant="contained"
          color="secondary"
          disabled={value === SECTIONS.length - 1}
          onClick={() => {
            setValue(value + 1)
          }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  )
}

export default shield()(ResumakePage)
