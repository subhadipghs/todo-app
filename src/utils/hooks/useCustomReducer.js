import React from "react";

function useDispatch(dispatch) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return (
      () => {
        mounted.current = false;
      },
      [mounted]
    );
  });

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

const defaultInitalState = { status: "idle", data: null, error: null };

function useCustomReducer(reducer = () => null, initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitalState,
    ...initialState,
  });

  const [{ status, data, error }, setState] = React.useReducer(
    (state, action) => ({ ...state, ...action }),
    initialStateRef.current
  );

  const dispatch = useDispatch(setState);
  const setData = React.useCallback(
    (data) => dispatch({ data: data, status: "success" }),
    [dispatch]
  );

  const setError = React.useCallback((error) => dispatch({ error: "error" }), [
    dispatch,
  ]);

  const run = React.useCallback((fn) => {
    if (!fn || !fn.then) {
      throw new TypeError(`argument passed to run, must be a promise`);
    }
    setState({ status: "loading" });
    return fn
      .then((res) => {
        setData(res);
        return res;
      })
      .catch((err) => {
        setError(err);
        return Promise.reject(err);
      });
  });

  return {
    isIdle: status === "idle",
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
    setData,
    setError,
    data,
    error,
    status,
    run,
  };
}
