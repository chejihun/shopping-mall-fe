import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

const loginWithToken = () => async (dispatch) => {
  try{
    dispatch({type:types.LOGIN_WITH_TOKEN_REQUEST})
    const response = await api.get("/user/me")
    if(response.status !== 200) throw new Error(response.error)
    // console.log("리스폰 체크", response)
    dispatch({
      type: types.LOGIN_WITH_TOKEN_SUCCESS,
      payload: response.data
    });
  } catch(error){
    dispatch({tpye:types.LOGIN_WITH_TOKEN_FAIL})
    dispatch(logout());
  }
};

const loginWithEmail = ({email, password}) => async (dispatch) => {
  try{
    dispatch({type: types.LOGIN_REQUEST})
    const response = await api.post("/auth/login", {email, password})
    if(response.status !== 200) {throw new Error(response.error)} 
    dispatch({type: types.LOGIN_SUCCESS, payload:response.data})
    sessionStorage.setItem("token", response.data.token)
  }catch(error) {
    dispatch({type:types.LOGIN_FAIL, payload:error.error})
  }
};
const logout = () => async (dispatch) => {
  //user 정보를 지우고
  dispatch({type: types.LOGOUT});
  //session token 값을 지운다
  sessionStorage.removeItem("token");

};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({type: types.REGISTER_USER_REQUEST})
      const response = await api.post("/user", {email, name, password});
      if(response.status !== 200) {
        throw  new Error(response.error)
      }
      dispatch({type:types.REGISTER_USER_SUCCESS})
      dispatch(commonUiActions.showToastMessage("회원가입을 완료 했습니다.", "success"))
      navigate("/login");

    } catch(error) {
      dispatch({type:types.REGISTER_USER_FAIL, payload:error.error})
    }

  };

export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
