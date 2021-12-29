import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated, Platform, Button, } from 'react-native'
import { GradientButton, Input } from '../../../components/common'
import AppModal from '../../../components/common/TaskModal'
import { NotificationModal } from '../../../components/common/NotificationModal'
import TodoTask from '../../../components/TodoTask/TodoTask'
import { green, lightGrey, pink, purple } from '../../../styles/colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import Select, { SelectItem } from '@redmin_delishaj/react-native-select';
import Todo from '../TodoContainer/TodoContainer'
import { useDispatch, useSelector } from 'react-redux'
import TaskModal from '../../../components/common/TaskModal'
import { setCurrentTodo } from '../../../redux/actions/todo.actions'
import { updateTodo } from '../../../services/todo.services'



export default function CompletedTodo() {

  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)
  const [newTodos, setNewTodos] = useState([])

  const todos = useSelector((state: any) => state.todo.allTodos)
  const user = useSelector((state: any) => state.user.currentUser)

  useEffect(() => {
    if (todos.length) {
      setNewTodos(todos.filter((t: any) => t.user === user.id && t.isCompleted))
    }
  }, [todos])

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
      <TaskModal modalVisible={modalVisible} setModalVisible={setModalVisible} onAddHandler={() => { }} onUpdateHandler={onUpdateHandler} />
      <Todo tasks={newTodos}
        onClick={(todo: any) => {
          dispatch(setCurrentTodo(todo))
          setModalVisible(true)
        }}
        disabled={false}
        style={{ height: Dimensions.get('screen').height }}
      />
    </View>
  )
}
