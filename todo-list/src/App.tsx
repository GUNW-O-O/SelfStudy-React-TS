// src/App.tsx
import { useState } from 'react'; // React의 useState 훅을 가져옵니다.
import type { Todo } from './types'; // 방금 만든 types.ts에서 Todo 인터페이스를 가져옵니다.
import './App.css'; // 기본 CSS 파일은 그대로 사용합니다.

function App() {
  // `todos`는 할 일 목록을 저장하는 상태 변수입니다.
  // `setTodos`는 `todos` 상태를 업데이트하는 함수입니다.
  // `useState<Todo[]>([])`는 `todos`가 `Todo` 타입 객체들의 배열이며, 초기값은 빈 배열임을 나타냅니다.
  const [todos, setTodos] = useState<Todo[]>([]);

  // `newTodoText`는 새로운 할 일을 입력받는 <input> 필드의 상태입니다.
  // `setNewTodoText`는 이 상태를 업데이트하는 함수입니다.
  const [newTodoText, setNewTodoText] = useState<string>('');

  // 새로운 할 일을 목록에 추가하는 함수
  const handleAddTodo = () => {
    // 입력 필드가 비어있으면 경고 메시지를 표시하고 함수를 종료합니다.
    if (newTodoText.trim() === '') {
      alert('할 일을 입력해주세요!');
      return;
    }

    // 새로운 할 일 객체를 `Todo` 인터페이스에 맞춰 생성합니다.
    // `Date.now().toString()`을 사용하여 간단한 고유 ID를 만듭니다.
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText,
      completed: false, // 처음 추가될 때는 완료되지 않은 상태입니다.
    };

    // `setTodos`를 사용하여 기존 할 일 목록에 새 할 일을 추가합니다.
    // `prevTodos`는 현재 `todos` 상태의 최신 값입니다.
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // 할 일을 추가했으니 입력 필드를 비웁니다.
    setNewTodoText('');
  };

  // 할 일의 완료 상태를 토글(변경)하는 함수
  // `id`는 어떤 할 일을 토글할지 식별하기 위한 값입니다.
  const handleToggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      // `map`을 사용하여 `prevTodos` 배열을 순회합니다.
      prevTodos.map((todo) =>
        // 현재 `todo`의 ID가 주어진 `id`와 같으면
        todo.id === id
          ? // 해당 `todo`의 `completed` 속성을 반대로 바꾼 새 객체를 반환합니다.
            { ...todo, completed: !todo.completed }
          : // ID가 다르면 기존 `todo` 객체를 그대로 반환합니다.
            todo
      )
    );
  };

  // 할 일을 목록에서 삭제하는 함수
  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      // `filter`를 사용하여 주어진 `id`와 다른 할 일들만 남기고 새로운 배열을 반환합니다.
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  return (
    <div className="App">
      <h1>나의 할 일 목록</h1>

      {/* 할 일을 입력하고 추가하는 섹션 */}
      <div className="todo-input-section">
        <input
          type="text"
          value={newTodoText} // <input> 값은 `newTodoText` 상태와 연결됩니다.
          // 입력값이 변경될 때마다 `newTodoText` 상태를 업데이트합니다.
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="새로운 할 일을 입력하세요..."
        />
        <button onClick={handleAddTodo}>추가</button> {/* 버튼 클릭 시 `handleAddTodo` 실행 */}
      </div>

      {/* 할 일 목록을 표시하는 섹션 */}
      <div className="todo-list">
        {todos.length === 0 ? ( // 할 일이 없으면 메시지를 표시합니다.
          <p>아직 할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
        ) : (
          <ul>
            {/* `todos` 배열을 순회하며 각 할 일 항목을 <li> 태그로 렌더링합니다. */}
            {todos.map((todo) => (
              // `key` prop은 React가 목록의 항목을 효율적으로 업데이트하는 데 필요합니다.
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                {/* `span`을 클릭하면 할 일 완료 상태를 토글합니다. */}
                <span onClick={() => handleToggleComplete(todo.id)}>
                  {todo.text}
                </span>
                {/* 삭제 버튼 클릭 시 `handleDeleteTodo` 실행 */}
                <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;