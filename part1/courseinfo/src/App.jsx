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
      <Part name={props.data[0].partname} count={props.data[0].count}/>
      <Part name={props.data[1].partname} count={props.data[1].count}/>
      <Part name={props.data[2].partname} count={props.data[2].count}/>
    </>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content data={[{partname: part1, count : exercises1}, 
                          {partname: part2, count : exercises2},
                          {partname: part3, count : exercises3}]}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </>

  )
}

export default App
