import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { User } from "../../types";

interface State {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
}
// 유저 정보 유저의 인증유무
const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

//유저의 정보를 업데이트 하거나 인증 유무를 업데이트 하는 것을 구현
const DispatchContext = createContext<any>(null);

interface Action {
  type: string;
  payload: any;
}

// 복잡한 state 사용할때 씀
const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  console.log("state", state);

  const dispatch = (type: string, payload?: any) => {
    defaultDispatch({ type, payload });
  };

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await axios.get("/auth/me");
        dispatch("LOGIN", res.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch("STOP_LOADING");
      }
    }
    loadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
