import { Node } from "@babel/types";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, ScrollView, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { GradientButton, green, Input, lightGrey } from ".";
import DateTimePicker from '@react-native-community/datetimepicker';
import { setCurrentTodo } from "../../redux/actions/todo.actions";
import { useDispatch, useSelector } from "react-redux";

const TodoForm = ({ onAdd, currentTodo, onUpdate, onClose }: { onAdd: Function, currentTodo: any, onUpdate: Function, onClose: Function }) => {
  const [form, setForm] = useState<any>({
    task: '',
    date: moment().format(),
    time: moment().format(),
    priority: 'Low',
    isCompleted: false,
    description: ''
  })

  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ]);

  useEffect(() => {
    if (currentTodo) {
      setForm({
        task: currentTodo.task,
        date: moment(currentTodo.date).format(),
        time: moment(currentTodo.time).format(),
        priority: currentTodo.priority,
        isCompleted: currentTodo.isCompleted,
        description: currentTodo.description
      })
    }
  }, [currentTodo])



  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || form.date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setForm({ ...form, date, time: date })
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };



  return (
    <View style={{ height: Dimensions.get('screen').height }}>

      <View>
        <Text style={{ marginBottom: 12 }}>Task *</Text>
        <Input
          placeholder='Task'
          style={{ width: Dimensions.get('screen').width / 1.2, borderRadius: 5, borderWidth: 1, borderColor: '#666', textAlignVertical: 'top', marginBottom: 8 }}
          isValid
          toolTipText={''}
          key={'task'}
          keyboardType={'default'}
          value={form.task}
          onChange={(value) => setForm({ ...form, task: value })}

          initialColor={lightGrey}
          finalColor={green}
          hasImage={false}

        // imageSourceInit={require('../../assets/images/email.png')}
        // imageSourceFinal={require('../../assets/images/activeEmail.png')}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Date *</Text>
        <View style={{ display: 'flex', flexDirection: 'row', width: 300, alignItems: 'center', justifyContent: 'flex-start' }}>
          <GradientButton style={{ borderRadius: 8, width: 120, height: 36, }} label={'Select Date'} isDisabled={false} onPress={showDatepicker} isLoading={false} textColor='white' colors={[green, green]} />
          <Text style={{ fontSize: 18, marginLeft: 12 }}>{moment(form.date).format('DD-MM-YYYY')}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Time *</Text>
        <View style={{ display: 'flex', flexDirection: 'row', width: 300, alignItems: 'center', justifyContent: 'flex-start' }}>
          <GradientButton style={{ borderRadius: 8, width: 120, height: 36, }} label={'Select Time'} isDisabled={false} onPress={showTimepicker} isLoading={false} textColor='white' colors={[green, green]} />
          <Text style={{ fontSize: 18, marginLeft: 12 }}>{moment(form.date).format('hh:mm a')}</Text>
        </View>
      </View>
      {show && (<DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={false}
        display="default"
        onChange={onChange}
      />)}
      <View style={{ marginBottom: 16, }}>
        <Text style={{ marginBottom: 12, }}>Priority</Text>
        <DropDownPicker
          mode='SIMPLE'
          listMode='SCROLLVIEW'
          open={open}
          value={form.priority}
          items={items}
          setOpen={setOpen}
          setValue={(val) => setForm({ ...form, priority: val() })}
          setItems={setItems}
          style={{ width: 300 }}
          dropDownContainerStyle={{ width: 300 }}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 12 }}>Description</Text>
        <Input
          placeholder='Description'
          style={{ width: Dimensions.get('screen').width / 1.2, borderRadius: 5, borderWidth: 1, borderColor: '#666', textAlignVertical: 'top', marginBottom: 20 }}
          // isValid
          toolTipText={''}
          key={'description'}
          keyboardType={'default'}
          value={form.description}
          onChange={(value) => setForm({ ...form, description: value })}
          isAnimated={false}
          initialColor={lightGrey}
          finalColor={green}
          hasImage={false}
          numberOfLines={4}
        // imageSourceInit={require('../../assets/images/email.png')}
        // imageSourceFinal={require('../../assets/images/activeEmail.png')}
        />
      </View>
      {currentTodo ?
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <GradientButton style={{ borderRadius: 8, width: 140 }} label={'Delete'} isDisabled={false} onPress={() => onClose()} isLoading={false} textColor='#000' colors={['#eee', '#eee']} />
          <GradientButton style={{ borderRadius: 8, width: 180 }} label={currentTodo.isCompleted ? 'Mark Incomplete' : 'Mark Complete'} isDisabled={false} onPress={() => onUpdate({ ...form, isCompleted: !currentTodo.isCompleted }, currentTodo.id)} isLoading={false} textColor='#000' colors={['#eee', '#eee']} />
        </View> : null}
      {/* <FormDatePicker label='Date' name='date' required initialValue={currentTask ? moment(currentTask.values.date) : null} styles={null} />
        <FormTimePicker label='Time' name='time' required initialValue={currentTask ? moment(currentTask.values.time) : null} styles={null} /> */}

      <View>
        <GradientButton style={{ borderRadius: 8 }} label={currentTodo ? 'Edit Todo' : 'Add Todo'} isDisabled={false} onPress={() => currentTodo ? onUpdate(form, currentTodo.id) : onAdd(form)} isLoading={false} textColor='white' colors={[green, green]} />
        <GradientButton style={{ borderRadius: 8 }} label={'Cancel'} isDisabled={false} onPress={() => onClose()} isLoading={false} textColor='#000' colors={['#eee', '#eee']} />
      </View>
    </View>

  )
}




const TaskModal = ({ modalVisible, setModalVisible, onAddHandler, onUpdateHandler }: { modalVisible: boolean, setModalVisible: Function, onAddHandler: Function, onUpdateHandler: Function }) => {
  const dispatch = useDispatch()
  const currentTodo = useSelector((state: any) => state.todo.currentTodo)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <ScrollView style={styles.modalView} contentContainerStyle={{ alignItems: "center", }}>
          <TodoForm onAdd={onAddHandler} currentTodo={currentTodo} onUpdate={onUpdateHandler} onClose={() => {
            setModalVisible(false)
            dispatch(setCurrentTodo(null))
          }} />
        </ScrollView>
      </View>
    </Modal>


  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default TaskModal;