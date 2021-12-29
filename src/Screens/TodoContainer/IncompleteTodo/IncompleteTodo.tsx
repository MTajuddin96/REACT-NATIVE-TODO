import React, { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import { GradientButton } from '../../../components/common'

import { green, } from '../../../styles/colors'

import Todo from '../TodoContainer/TodoContainer'
import { useDispatch, useSelector } from 'react-redux'
import { addNewTodo, updateTodo } from '../../../services/todo.services'
import { setCurrentTodo } from '../../../redux/actions/todo.actions'
import TaskModal from '../../../components/common/TaskModal'


export default function IncompleteTodo() {

  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)
  const [newTodos, setNewTodos] = useState([])

  const todos = useSelector((state: any) => state.todo.allTodos)

  const user = useSelector((state: any) => state.user.currentUser)


  useEffect(() => {
    if (todos.length) {
      setNewTodos(todos.filter((t: any) => t.user === user.id && !t.isCompleted))
    }
  }, [todos])


  const onAddHandler = async (values: {
    task: '',
    date: '',
    time: '',
    priority: '',
    isCompleted: boolean,
    description: ''
  }) => {
    await dispatch(addNewTodo({ ...values, isCompleted: false, user: user.id }, todos))
    setModalVisible(false)
  }

  const onUpdateHandler = async (values: {
    task: string,
    date: string,
    time: string,
    priority: string,
    description: string,
    isCompleted: boolean
    id: string
  }, tid: string) => {
    console.log(tid, { ...values, user: user.id }, todos)
    await dispatch(updateTodo(tid, { ...values, user: user.id }, todos))
    dispatch(setCurrentTodo(null))
    setModalVisible(false)
  }

  return (
    <View style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#EBF2EF' }}>
      <TaskModal modalVisible={modalVisible} setModalVisible={setModalVisible} onAddHandler={onAddHandler} onUpdateHandler={onUpdateHandler} />
      <Todo tasks={newTodos}
        onClick={(todo: any) => {
          console.log(todo)
          dispatch(setCurrentTodo(todo))
          setModalVisible(true)
        }}
        disabled={false}
        style={{ height: Dimensions.get('screen').height / 1.4 }}
      />
      <View style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
        <GradientButton label={'Add New Todo'} onPress={() => setModalVisible(true)} isLoading={false} isDisabled={false} textColor='white' colors={[green, green]} style={{ width: 200 }} />
      </View>
    </View>
  )
}
