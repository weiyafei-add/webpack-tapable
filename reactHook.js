let workInProgressHook = null;

const Fiber = {
  type: FunctionComponent,
  memorizedState: null,
};

// 获取或创建新hook的方式

function updateWorkInProgressHook() {
  // 获取旧Fiber
  const current = Fiber.alternate;
  let hook;

  // 如果存在旧的Fiber 则是更新阶段
  if (current) {
    Fiber.memorizedState = current.memorizedState;
    if (workInProgressHook) {
      hook = workInProgressHook = workInProgressHook.hook;
    } else {
      hook = workInProgressHook = current.memorizedState;
    }
  } else {
    hook = {
      memorizedState: null,
      next: null,
    };

    if (workInProgressHook) {
      // 如果有尾Hook 则说明不是头节点hook
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // 如果没有尾Hook, 则说明是头节点hook
      workInProgressHook = Fiber.memorizedState = hook;
    }
  }

  return hook;
}

function useReducer(reducer, initalState) {
  if (!Fiber.memorizedState) Fiber.memorizedState = initalState;
  const dispatch = dispatchReducerAction.bind(null, Fiber, reducer);
  return [Fiber.memorizedState, dispatch];
}

function dispatchReducerAction(filber, reducer, action) {
  filber.memorizedState = reducer ? reducer(filber.memorizedState) : action;
  filber.type();
}

function useState(initalState) {
  return useReducer(null, initalState);
}

function FunctionComponent() {
  const [count, setCount] = useState(0);
  console.log("渲染的count:", count);
  return { count, setCount };
}

const result = Fiber.type();
result.setCount(1);
// result.setCount(2);
// result.setCount(3);
console.log(Fiber);
