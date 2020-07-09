import React from "react"
import { NextPage, GetServerSideProps } from "next"
import Router from "next/router"
import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  Grid,
  Hidden,
  Tabs,
  Tab,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core"

import { shield, useShield } from "utils"
import HomePage from "pages/index"
import {
  TemplatesType,
  ProfileType,
  EducationType,
  ExperienceType,
  SkillsType,
  ProjectsType,
  AwardsType,
  TemplatesComponent,
  ProfileComponent,
  EducationComponent,
  ExperienceComponent,
  SkillsComponent,
  ProjectsComponent,
  AwardsComponent,
} from "components/ResumeComponents"

const MakeButton = () => (
  <Button variant="outlined" color="primary" style={{ width: 128 }}>
    MAKE
  </Button>
)

export const SECTIONS = [
  { name: "Templates", component: TemplatesComponent },
  { name: "Profile", component: ProfileComponent },
  { name: "Education", component: EducationComponent },
  { name: "Experience", component: ExperienceComponent },
  { name: "Skills", component: SkillsComponent },
  { name: "Projects", component: ProjectsComponent },
  { name: "Awards", component: AwardsComponent },
]

type ResumeType =
  | {
      templates: TemplatesType
      profile: ProfileType
      education: EducationType
      experience: ExperienceType
      skills: SkillsType
      projects: ProjectsType
      awards: AwardsType
    }
  | {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    width: "100vw",
    background: theme.palette.background.paper,
  },
  header: {
    height: 64,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  main: {
    flexGrow: 1,
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  footer: {
    height: 64,
  },
  middle: {
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

export const ResumakePage: NextPage<any> = ({ authorized, fallback }) => {
  useShield({ authorized, fallback })
  if (!authorized) return <HomePage />

  const classes = useStyles()

  const [value, setValue] = React.useState<number>(0)
  React.useEffect(() => {
    const pathname = `/resumake/${SECTIONS[value].name.toLowerCase()}`
    Router.replace("/resumake", pathname, { shallow: true })
  }, [value])
  const Section = SECTIONS[value].component

  const [resume, setResume] = React.useState<ResumeType>({})

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue)
  }

  return (
    <Grid container direction="column" className={classes.root}>
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
              <MakeButton />
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={4} className={classes.middle}>
          <Section />
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            Right
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
          <MakeButton />
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
