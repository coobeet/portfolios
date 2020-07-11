import React from "react"
import {
  TextField,
  makeStyles,
  Theme,
  Typography,
  Divider,
} from "@material-ui/core"

import { theme } from "utils"

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    margin: `${theme.spacing(2)}px 0`,
  },
}))

export type TemplatesType = {
  selected: number
}

export const initialTemplatesState: TemplatesType = {
  selected: 0,
}

export const TemplatesComponent: React.FC<TemplatesType> = (props) => {
  console.log(props)
  return <Typography variant="h6">CHOOSE A TEMPLATE</Typography>
}

export type ProfileType = {
  fullName: string
  email: string
  phone: string
  location: string
  link: string
}

export const initialProfileState: ProfileType = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  link: "",
}

export const ProfileComponent: React.FC<ProfileType> = (props) => {
  console.log(props)
  const classes = useStyles()

  return (
    <form>
      <Typography variant="h6">YOUR PERSONAL INFO</Typography>
      <TextField
        label="Full Name"
        placeholder="Frank Huang"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Email"
        placeholder="frank@example.com"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Phone Number"
        placeholder="188-1234-5678"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Location"
        placeholder="Hangzhou, ZJ"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Link"
        placeholder="https://github.com/bttyfrank"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
    </form>
  )
}

export type EducationType = {
  heading: string
  schools: Array<{
    name: string
    location: string
    degree: string
    major: string
    gpa: number
    startDate: Date
    endDate: Date
  }>
}

export const initialEducationState: EducationType = {
  heading: "",
  schools: [],
}

export const EducationComponent: React.FC<EducationType> = (props) => {
  console.log(props)
  const classes = useStyles()

  return (
    <form>
      <Typography variant="h6">YOUR EDUCATIONAL BACKGROUND</Typography>
      <TextField
        label="Section Heading"
        placeholder="Education"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <Divider
        style={{
          height: 16,
          margin: "16px 0",
          background: theme.palette.secondary.main,
        }}
      />
      <TextField
        label="School Name"
        placeholder="Zhejiang University"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="School Location"
        placeholder="Hangzhou, ZJ"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Degree"
        placeholder="BS"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="GPA"
        placeholder="3.8"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Start Date"
        placeholder="Sep 2014"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="End Date"
        placeholder="Jun 2018"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
    </form>
  )
}

export type ExperienceType = {
  heading: string
  jobs: Array<{
    companyName: string
    title: string
    location: string
    startDate: Date
    endDate: Date
    responsibilites: Array<string>
  }>
}

export const initialExperienceState: ExperienceType = {
  heading: "",
  jobs: [],
}

export const ExperienceComponent: React.FC<ExperienceType> = () => {
  const classes = useStyles()

  return (
    <form>
      <Typography variant="h6">YOUR WORK EXPERIENCE</Typography>
      <TextField
        label="Section Heading"
        placeholder="Work Experience"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <Divider
        style={{
          height: 16,
          margin: "16px 0",
          background: theme.palette.secondary.main,
        }}
      />
      <TextField
        label="Company Name"
        placeholder="TP-Link"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Job Title"
        placeholder="Product Designer"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Job Location"
        placeholder="Shenzhen, GD"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Start Date"
        placeholder="Jul 2018"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="End Date"
        placeholder="Jul 2019"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Job Responsibilities"
        placeholder="Did some cool stuff at company"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
    </form>
  )
}

export type SkillsType = {
  heading: string
  list: Array<{
    name: string
    details: Array<string>
  }>
}

export const initialSkillsState: SkillsType = {
  heading: "",
  list: [],
}

export const SkillsComponent: React.FC<SkillsType> = () => {
  const classes = useStyles()

  return (
    <form>
      <Typography variant="h6">YOUR SKILLS</Typography>
      <TextField
        label="Section Heading"
        placeholder="Skills"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <Divider
        style={{
          height: 16,
          margin: "16px 0",
          background: theme.palette.secondary.main,
        }}
      />
      <TextField
        label="Skill Name"
        placeholder="Programming Languages"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Skill Details"
        placeholder="Typescript"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
    </form>
  )
}

export type ProjectsType = {
  heading: string
  list: Array<{
    name: string
    desc: string
    link: string
    tools: Array<string>
  }>
}

export const initialProjectsState: ProjectsType = {
  heading: "",
  list: [],
}

export const ProjectsComponent: React.FC<ProjectsType> = () => {
  const classes = useStyles()

  return (
    <form>
      <Typography variant="h6">YOUR PROJECTS</Typography>
      <TextField
        label="Section Heading"
        placeholder="Projects"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <Divider
        style={{
          height: 16,
          margin: "16px 0",
          background: theme.palette.secondary.main,
        }}
      />
      <TextField
        label="Project Name"
        placeholder="Personal Portfolios"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Project Description"
        placeholder="Todos, Calculator, Arkanoid, Resumake"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Link to Project"
        placeholder="https://bttyfrank-portfolios.vercel.app"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Tools Used"
        placeholder="Typescript"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
    </form>
  )
}

export type AwardsType = {
  heading: string
  list: Array<{
    name: string
    date: Date
    awarder: string
    summary: Array<string>
  }>
}

export const initialAwardsState: AwardsType = {
  heading: "",
  list: [],
}

export const AwardsComponent: React.FC<AwardsType> = () => {
  const classes = useStyles()

  return (
    <form>
      <Typography variant="h6">YOUR AWARDS</Typography>
      <TextField
        label="Section Heading"
        placeholder="Awards"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <Divider
        style={{
          height: 16,
          margin: "16px 0",
          background: theme.palette.secondary.main,
        }}
      />
      <TextField
        label="Award Name"
        placeholder="Super Hacker"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Award Date"
        placeholder="May 2015"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Awarder"
        placeholder="HackNY"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <TextField
        label="Summary"
        placeholder="Recognized for creating the most awesome project at a hackathon  "
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
    </form>
  )
}

export const initialResumeState = {
  templates: initialTemplatesState,
  profile: initialProfileState,
  education: initialEducationState,
  experience: initialExperienceState,
  skills: initialSkillsState,
  projects: initialProjectsState,
  awards: initialAwardsState,
}

export type ResumeType = typeof initialResumeState
