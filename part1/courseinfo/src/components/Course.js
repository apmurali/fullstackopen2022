import React from 'react'

const Heading = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Part = ({part}) => {
  console.log(part)
  return (
    <li>
      <p>{part.name} {part.exercises}</p>
    </li>
  )
  }

const SumOfExercises = ({parts}) => {
  return (
    <div>
    <p><b>total of {parts.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.exercises;
    }, 0)} exercises</b></p>
    </div>
  )
}

const Parts = ({parts}) => {
  return(
    <ul style={{'listStyleType':"none",  'margin': 0, 'padding': 0}}>
    {parts.map(part => 
    <Part key={part.key} part={part}/>
   
    )}
     </ul>
  )
}

  
const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      
    
        <Heading text={course.name} />
        <Parts parts={course.parts} />
        <SumOfExercises parts={course.parts} />
                
     
    </div>
  )
}

export default Course