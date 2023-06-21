import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';
import {Title, Paragraph, Card, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {addTodo, deleteTodo} from '../redux/actions';

const TodoApp = ({todo_list, addTodo, deleteTodo}) => {
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    addTodo(task);
    setTask('');
  };

  const handleDeleteTodo = id => {
    deleteTodo(id);
  };

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>

          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer />
          <Button mode="contained" onPress={handleAddTodo}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <Card>
                <Card.Title
                  title={`Task#${item.id}`}
                  // left={props => <Icon name="tasks" size={24} color="black" />}
                  right={props => (
                    <ButtonIcon
                      iconName="close"
                      color="red"
                      onPress={() => handleDeleteTodo(item.id)}
                    />
                  )}
                />
                <Card.Content>
                  <Paragraph>{item.task}</Paragraph>
                </Card.Content>
              </Card>
              <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 100,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  };
};

const mapDispatchToProps = {addTodo, deleteTodo};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
