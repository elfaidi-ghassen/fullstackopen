const Header = (props) => <h1>{props.course}</h1>

const Part = ({name, count}) => <p>{name} {count}</p>


const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id}
              name={part.name}
              count={part.exercises}
        />
      )}
    </>
  )}

const Total = ({total}) => {
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  )
}

const Course = ({name, parts}) => {
  /// totalExercices([{name, exercises, id}, ...]) => integer [>= 0]
  /// return the total number of exercices, and 0 if there are no exercices
  function totalExercices(parts) {
    // initialValue is needed when there are no parts in a course (i.e. empty Array)
    let initialValue = 0
    return parts.map(part => part.exercises)
                .reduce((pre, curr) => pre + curr, initialValue)
  }

  return (
    <>
      <Header course={name} />
      <Content parts={parts}/>
      <Total total={totalExercices(parts)}/>
    </>
  )
}



export default Course
