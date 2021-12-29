import React from 'react'
import proptypes from 'prop-types'
import TodoTask from '../../../components/TodoTask/TodoTask'
import { Dimensions, ScrollView, Text } from 'react-native'

const Todo = ({ onClick, tasks, disabled, style }: { onClick: Function, tasks: any, disabled: boolean, style: any }) => {
  const renderTasks = () => {
    if (tasks.length) {
      return tasks.map((task: any) => (
        <TodoTask
          key={task.id}
          // onClick={() => { }}
          onClick={() => disabled ? {} : onClick(task)}
          task={task.task}
          priority={task.priority}
          date={task.date}
          time={task.time}
          isMeeting={task.isMeeting}
        />
      ))
    } else {
      return <Text>No Tasks</Text>
    }
  }

  return (
    <ScrollView style={{ height: Dimensions.get('screen').height, ...style }} contentContainerStyle={{ paddingBottom: 160 }}>
      {renderTasks()}
    </ScrollView>
  )
}

Todo.propTypes = {
  tasks: proptypes.array.isRequired,
  onClick: proptypes.func.isRequired,
  style: proptypes.object
};
export default Todo