import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Header from "../components/Header";
import Home from "../pages/Home";
import Footer from "../components/Footer";

const AuthContext = createContext({});

const contextRef = createRef();
const csrfRef = createRef();

export function AuthProvider({ authService, authErrorEventBus, children }) {
  const [_emailCode, setEmailCode] = useState("");
  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken] = useState(undefined);

  useImperativeHandle(contextRef, () => (user ? user.token : undefined));
  useImperativeHandle(csrfRef, () => csrfToken);

  // 에러 리스너
  // httpClient 측에서 에러를 notify하면 등록된 콜백 함수 listen이 실행되면서
  // 콘솔에 로그를 남기고 사용자를 undefined로 변경해 로그아웃 시킨다.
  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.csrfToken().then(setCsrfToken).catch(console.error);
  }, [authService]);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const verify = useCallback(
    async (email) =>
      authService.verify(email).then((emailCode) => {
        setEmailCode(emailCode.number);
      }),
    [authService]
  );

  const codeCheck = useCallback(
    async (emailCode) => {
      if (_emailCode !== emailCode) {
        console.log("codecheck 실패");
        return false;
      }
      return true;
    },
    [authService]
  );

  const signUp = useCallback(
    async (email, username, password, gender, birthDate, url) =>
      authService
        .signup(email, username, password, gender, birthDate, url)
        .then((user) => setUser(user)),
    [authService]
  );

  const logIn = useCallback(
    async (email, password) =>
      authService.login(email, password).then((user) => setUser(user)),
    [authService]
  );

  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService]
  );

  const context = useMemo(
    () => ({
      user,
      _emailCode,
      verify,
      codeCheck,
      signUp,
      logIn,
      logout,
    }),
    [user, _emailCode, verify, codeCheck, signUp, logIn, logout]
  );

  return (
    <AuthContext.Provider value={context}>
      {user ? (
        children
      ) : (
        <div className="app">
          <Header />
          <Home
            onVerify={verify}
            onCodeCheck={codeCheck}
            onSignUp={signUp}
            onLogin={logIn}
          />
          <Footer />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback;
  }
  notify(error) {
    this.callback(error);
  }
}

export default AuthContext;
export const fetchToken = () => contextRef.current;
export const fetchCsrfToken = () => csrfRef.current;
export const useAuth = () => useContext(AuthContext);
