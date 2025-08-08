const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.count}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.data[0].name} count={props.data[0].exercises}/>
      <Part name={props.data[1].name} count={props.data[1].exercises}/>
      <Part name={props.data[2].name} count={props.data[2].exercises}/>
    </>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content data={course.parts}/>
      <Total total={course.parts.map(part => part.exercises)
                        .reduce((pre, curr) => pre + curr)}/>
    </>

  )
}

export default App
