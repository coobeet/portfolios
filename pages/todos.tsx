import React from "react"
import { NextPage } from "next"
import axios from "axios"
import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  Grid,
  TextField,
  Button,
  Card,
  List,
  Checkbox,
  IconButton,
  Typography,
  ListItem,
  Divider,
} from "@material-ui/core"
import { Edit, Delete } from "@material-ui/icons"

import HomePage from "pages/index"
import { Todo, TodoCreateWithoutUserInput, TodoUpdateArgs } from "prisma"
import { shield, useShield, UseShieldArg } from "utils"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: 32,
  },
}))

let data: any = []
for (let i = 0; i < 50; i++) {
  data.push(i)
}

const TodosPage: NextPage<UseShieldArg> = ({ authorized, fallback }) => {
  useShield({ authorized, fallback })
  // @ts-ignore
  if (!authorized) return <HomePage />

  const classes = useStyles()
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [selected, setSelected] = React.useState<number | null>(null)
  const [editable, setEditable] = React.useState<boolean>(false)
  const [createTodoInput, setCreateTodoInput] = React.useState<string>("")
  const [titleInput, setTitleInput] = React.useState<string>("")
  const [detailInput, setDetailInput] = React.useState<string | null>("")

  React.useEffect(() => {
    axios.get("/api/todos").then((res) => {
      setTodos(res.data)
    })
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card style={{ height: 64 }}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ height: "100%" }}
                >
                  <Grid item>
                    <Button
                      onClick={() => {
                        if (createTodoInput) {
                          const data: TodoCreateWithoutUserInput = {
                            content: createTodoInput,
                          }
                          axios.post("/api/todos", data).then((res) => {
                            setTodos(todos.concat(res.data))
                          })
                        }
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={createTodoInput}
                      onChange={(e) => {
                        setCreateTodoInput(e.target.value)
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{ height: 480, overflow: "auto" }}>
                <List>
                  {todos.map((todo, index) => (
                    <ListItem key={index}>
                      <Checkbox
                        checked={todo.completed}
                        onClick={() => {
                          const data: TodoUpdateArgs = {
                            where: { id: todo.id },
                            data: { completed: !todo.completed },
                          }
                          axios.put("/api/todos", data).then((res) => {
                            setTodos(
                              todos
                                .slice(0, index)
                                .concat({
                                  ...todo,
                                  completed: !todo.completed,
                                })
                                .concat(todos.slice(index + 1))
                            )
                          })
                        }}
                      />
                      <IconButton
                        onClick={() => {
                          axios
                            .delete(`/api/todos?id=${todo.id}`)
                            .then((res) => {
                              setTodos(
                                todos
                                  .slice(0, index)
                                  .concat(todos.slice(index + 1))
                              )
                            })
                        }}
                      >
                        <Delete />
                      </IconButton>
                      <Button
                        fullWidth
                        onClick={() => {
                          setSelected(index)
                        }}
                      >
                        <Typography
                          color="primary"
                          align="left"
                          style={{ width: "100%" }}
                        >
                          {todo.content}
                        </Typography>
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card style={{ height: 560, overflow: "auto", padding: 16 }}>
                {!editable && (
                  <IconButton
                    style={{
                      position: "absolute",
                      width: 56,
                      height: 56,
                    }}
                    onClick={() => {
                      if (selected !== null) {
                        setEditable(true)
                        setTitleInput(todos[selected].content)
                        setDetailInput(todos[selected].detail)
                      }
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}

                {editable ? (
                  <React.Fragment>
                    <TextField
                      fullWidth
                      value={titleInput}
                      onChange={(e) => {
                        setTitleInput(e.target.value)
                      }}
                    />
                    <TextField
                      multiline
                      fullWidth
                      variant="filled"
                      style={{
                        marginTop: 16,
                        marginBottom: 16,
                      }}
                      value={detailInput}
                      onChange={(e) => {
                        setDetailInput(e.target.value)
                      }}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography variant="h3" align="center" color="primary">
                      {selected !== null ? todos[selected].content : "Detail"}
                    </Typography>
                    <Divider style={{ marginTop: 16 }} />
                    <Typography
                      variant="body1"
                      style={{
                        marginTop: 16,
                        marginBottom: 16,
                      }}
                    >
                      {selected !== null ? todos[selected].detail : ""}
                    </Typography>
                  </React.Fragment>
                )}
                {editable && (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginRight: 8,
                      }}
                      onClick={() => {
                        if (selected !== null) {
                          const data: TodoUpdateArgs = {
                            where: {
                              id: todos[selected].id,
                            },
                            data: {
                              content: titleInput,
                              detail: detailInput,
                            },
                          }
                          axios.put("/api/todos", data).then((res) => {
                            setTodos(
                              todos
                                .slice(0, selected)
                                .concat(res.data)
                                .concat(todos.slice(selected + 1))
                            )
                            setEditable(false)
                          })
                        }
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (selected !== null) {
                          setEditable(false)
                          setTitleInput(todos[selected].content)
                          setDetailInput(todos[selected].detail)
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </React.Fragment>
                )}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default shield()(TodosPage)
