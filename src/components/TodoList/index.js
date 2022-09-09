import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { todoRemainingSelector } from "../../redux/selectors";
import Todo from "../Todo";
import todoListSlice from "./TodosSlice";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const todoList = useSelector(todoRemainingSelector);

  const dispatch = useDispatch();
  const handleAddButtonClick = () => {
    dispatch(
      todoListSlice.actions.addTodo({
        id: v4(),
        name: todoName,
        completed: false,
        priority: priority,
      })
    );
    setTodoName("");
    setPriority("Medium");
  };

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)", overflow: "auto" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            prioriry={todo.priority}
            completed={todo.completed}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
