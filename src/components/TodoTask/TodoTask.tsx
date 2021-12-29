import React from 'react';
import proptypes from 'prop-types';
import moment from 'moment';
import { Text, TextStyle, TouchableOpacity, View } from 'react-native';
import { styles } from './TodoTask.style';

const TodoTask = ({ task, priority, date, time, onClick }: { task: string, priority: string, date: string, time: string, onClick: Function }) => {
  return (
    <TouchableOpacity style={{ ...styles.TodoTask }} onPress={()=>onClick()}>
      <View style={{ width: '79%' }}>
        <Text style={styles.todoDescription as unknown as TextStyle}>{task}</Text>
        <Text numberOfLines={1} style={{ fontSize: 14 }}>{`Deadline ${moment(time).format('hh:mm  a')} | ${moment(date).format('DD MMM')}`}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 8, width: 8, marginRight: 8, borderRadius: 30, backgroundColor: priority === 'High' ? '#e62e2e' : priority === 'Medium' ? '#1e79d8' : '#3ACC1E' }} />
        <Text style={{ color: priority === 'High' ? '#e62e2e' : priority === 'Medium' ? '#1e79d8' : '#3ACC1E' }}>{priority}</Text>
      </View>
    </TouchableOpacity >
  )
}

TodoTask.propTypes = {
  priority: proptypes.string.isRequired,
  task: proptypes.string.isRequired,
  date: proptypes.string.isRequired,
  time: proptypes.string.isRequired,
  onClick: proptypes.func.isRequired,
  isMeeting: proptypes.bool
};
export default TodoTask


