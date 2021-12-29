import moment from 'moment'
import React, { useState } from 'react'
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
import { useSelector } from 'react-redux'



export default function PublicTodo() {

  const todos = useSelector((state: any) => state.todo.allTodos)
  return (
    <View style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#EBF2EF' }}>

      <Todo tasks={todos} onClick={() => { }} disabled style={{ height: Dimensions.get('screen').height }} />
    </View>
  )
}
