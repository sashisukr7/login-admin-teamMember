import React, { useState ,useRef,useEffect} from 'react';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { useHistory } from 'react-router-dom';
import {isEmpty,emailRegex,passwordRegex,isValidName} from '../../util/apputils';
import {useSelector, useDispatch} from 'react-redux';
import store from "../../index"

function LoginForm(props) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.registedReducer.userList)
    const history = useHistory();
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);
    const [state, setState] = useState({
        email: "sashisukumar@gmail.com",
        password: "123456789*",
        successMessage: null
    })
    const [formErrors , setFormErrors] = useState({
        email : "",
        password:"",
    })
    const [visibleError , setVisibleError] = useState({
        email : "",
        password:"",
    })
    useEffect(() => {
        console.log("getstate",store.getState())
        try{
            let role=localStorage.getItem("role");
            let accessToken=localStorage.getItem("accessToken");
        if(accessToken && role )
        {
            checkRoleLogin(role)
        }
    }
    catch{
        localStorage.clear()
    }
        console.log("sssStateRAdmin",userList)
    },[])

    const checkRoleLogin =(role)=>{
        if(role == "admin")
        {
            redirectToAdminHome();
        }
         else{
            redirectToTeamMemberHome(); 
        }
    }
    
    const handleChange = (e) => {
        const {id , value} = e.target 
        switch (id) {
            case "email":
                if (emailRegex.test(value)) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        email: ""
                      }))
                  }
                 else{
                    setFormErrors(prevState => ({
                        ...prevState,
                        email: "invalid email address"
                      }))
                 }
              break;
              case "password":
                if (isValidPassword(value)) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        password: ""
                      }))
                  }
                 else{
                    setFormErrors(prevState => ({
                        ...prevState,
                        password: "Minimum 8 characters & 1 special character required"
                      }))
                 }
              break;
            default:
              break;
            }
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const isValidPassword=(password)=> {
        let result = passwordRegex.test(password)
        return result
      }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(validateForm()) {
        let without_backend_support = true
        //without backend support
        let userData={};
        if (without_backend_support) {
            
            let flagFound=0;
             for(let i in userList)
             {
                 if(userList[i].email==state.email && userList[i].password==state.password)
                 {
                    flagFound=1;
                    userData=userList[i];
                    break;
                 }
             }

             if(flagFound==0)
             {
                 alert("You have entered wrong email or password.")
                 return
             }
            let h = localStorage.setItem("sessionTimeoutHour", 0);
            let m = localStorage.setItem("sessionTimeoutMinute", 15);
            let s = localStorage.setItem("sessionTimeoutSecond", 0);
           
            localStorage.setItem('userId', userData.id);
            localStorage.setItem('userEmail', userData.email);
            localStorage.setItem('userName', userData.name)
            localStorage.setItem('role', userData.role);
            localStorage.setItem('accessToken', userData.accessToken);
              dispatch({
                type: 'LOGIN',
                payload: {
                  user:userData
                }
              });

            props.setTimer(0, 15, 0);
            props.updateTitle('Home')
            checkRoleLogin(userData.role);
        }
        else {
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            axios.post(API_BASE_URL + '/user/login', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Login successful. Redirecting to home page..'
                        }))

                       
                        userData.id = response.data.userDetail.id
                        userData.email = response.data.userDetail.userName
                        userData.accessToken = response.data.token
                        let name = response.data.userDetail.firstName + " " + response.data.userDetail.lastName
                        userData.name = name
                        userData.role = response.data.role
            
                        localStorage.setItem('userId', userData.id);
                        localStorage.setItem('userEmail', userData.email);
                        localStorage.setItem('userName', userData.name)
                        localStorage.setItem('role', userData.role);
                        localStorage.setItem('accessToken', userData.accessToken);
                          dispatch({
                            type: 'LOGIN',
                            payload: {
                              user:userData
                            }
                          });

                          checkRoleLogin(userData.role);
                       // props.showError(null)
                    }
                    else if (response.code === 204) {
                      //  props.showError("Username and password do not match");
                    }
                    else {
                       // props.showError("Username does not exists");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    }
    const redirectToAdminHome = () => {
        props.updateTitle('Home')
        history.push('/admin');
    }
    const redirectToTeamMemberHome = () => {
        props.updateTitle('Home')
        history.push('/teamMember');
    }
    const redirectToRegister = () => {
         history.push('/register'); 
         props.updateTitle('Register');
    }

    const validateForm=()=> {
        if (!isEmpty(state.email) && !isEmpty(state.password) &&
          isEmpty(formErrors.email) &&  isEmpty(formErrors.password)
         ) {
          return true;
        }
        else if (isEmpty(state.email)) {
            inputRefEmail.current.focus();
            setFormErrors(prevState => ({
                ...prevState,
                email: "Please provide email"
              }))
              setVisibleError(prevState => ({
                 ...prevState,
                 email:true
             }))
          return false;
        }
        else if (isEmpty(state.password)) {
            inputRefPassword.current.focus();
            setFormErrors(prevState => ({
                ...prevState,
                password: "Please provide password"
              }))
              setVisibleError(prevState => ({
                 ...prevState,
                 password:true
             }))
          return false;
        }
        else {
          return false;
        }
      }
      
    const hideErrorMsg = (name) => {
        toggleErrorVisibility(name, false)
      }
    
    const showErrorMsg = (name) => {
        toggleErrorVisibility(name, true)
      }
    
    const toggleErrorVisibility = (name, value) => {
        switch (name) {
            case "email":
                setVisibleError(prevState => ({
                    ...prevState,
                    email: value
                }))
                break;
            case "password":
                setVisibleError(prevState => ({
                    ...prevState,
                    password: value
                }))
                break;
            default:
                break;
        }
    }
    return (
        <div className="d-flex align-items-center flex-column">
        <div className="card col-12 col-lg-4 login-card  mt-2 hv-center p-64px-16px ">
            <form >
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">UserName</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        ref={inputRefEmail}
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                        autoComplete="off"
                        spellCheck="false"
                        onFocus={() =>hideErrorMsg("email")}
                        onBlur={() =>showErrorMsg("email")}
                    />
                     <div className="m-2">
                        {formErrors.email.length > 0 && visibleError.email && (
                          <span className="errorMessage">{formErrors.email} </span>
                        )}
                      </div>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        ref={inputRefPassword}
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        autoComplete="off"
                        spellCheck="false"
                        onFocus={() =>hideErrorMsg("passsword")}
                        onBlur={() =>showErrorMsg("password")}
                    />
                     <div className="m-2">
                        {formErrors.password.length > 0 && visibleError.password && (
                          <span className="errorMessage">{formErrors.password} </span>
                        )}
                      </div>
                </div>
               
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
        </div>
        </div>
    )
}

export default LoginForm;