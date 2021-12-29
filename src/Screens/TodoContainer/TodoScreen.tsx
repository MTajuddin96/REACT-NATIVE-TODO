import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PublicTodo from './PublicTodo/PublicTodo';
import IncompleteTodo from './IncompleteTodo/IncompleteTodo';
import Todo from './TodoContainer/TodoContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos } from '../../services/todo.services';
import CompletedTodo from './CompletedTodo/CompletedTodo';

const Tab = createMaterialTopTabNavigator();

export default function TodoScreen() {
  const dispatch = useDispatch()

  const getTodos = () => {
    dispatch(getAllTodos())

  }
  useEffect(() => {
    getTodos()
  }, [])

  const todos = useSelector((state: any) => state.todo.allTodos)
  const currentTodo = useSelector((state: any) => state.todo.currentTodo)
  console.log(currentTodo)
  return (
    <Tab.Navigator initialRouteName='Public'>
      <Tab.Screen name="Public" component={PublicTodo} />
      <Tab.Screen name="Incomplete" component={IncompleteTodo} />
      <Tab.Screen name="Completed" component={CompletedTodo} />
    </Tab.Navigator>
  )
}
