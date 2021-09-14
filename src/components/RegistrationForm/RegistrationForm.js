import React, {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import {isEmpty,emailRegex,passwordRegex,isValidName,generateRandomValue} from '../../util/apputils';
import {useSelector, useDispatch} from 'react-redux';

function RegistrationForm(props) {
    const dispatch = useDispatch();
    const inputRefRole = useRef(null);
    const inputRefFirstName = useRef(null);
    const inputRefLastName = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);
    const inputRefConfirmPassword = useRef(null);
    const authData = useSelector(state => state.authReducer);

    const [state , setState] = useState({
        firstName:"",
        lastName:"",
        role:"",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const [formErrors , setFormErrors] = useState({
        firstName:"",
        lastName:"",
        role:"",
        email : "",
        password:"",
        confirmPassword:"",
    })
    const [visibleError , setVisibleError] = useState({
        firstName:"",
        lastName:"",
        email : "",
        password:"",
        confirmPassword:"",
    })


    const handleChange = (e) => {
        const {id , value} = e.target 
        switch (id) {
            case "role":
              if (isEmpty(value)) {
                setFormErrors(prevState => ({
                    ...prevState,
                    role: "Please provide role"
                  }))
              }
             else{
                setFormErrors(prevState => ({
                    ...prevState,
                    role: ""
                  }))
             }
              break;
            case "firstName":
                if (isValidName(value)) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        firstName: ""
                      }))
                  }
                 else{
                      return
                 }
                 break;
                
            case "lastName":
                if (isValidName(value)) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        lastName: ""
                      }))
                  }
                 else{
                    return
                 }
                 break;
                 
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
              case "confirmPassword":
                if (isValidPassword(value)) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        confirmPassword: ""
                      }))
                  }
                 else{
                    setFormErrors(prevState => ({
                        ...prevState,
                        confirmPassword: "Minimum 8 characters & 1 special character required"
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

    const sendDetailsToServer = () => {
           // props.showError(null);
//redirect to home page considering admin
//generate token,id,userdata, and save in (authreducer +localstorage parse and stingify) + registered candidate array in registerreducer
            let userData = {}
            let ran=generateRandomValue();
            userData.id = ran
            userData.email = state.email
            userData.accessToken = ran-1
            let name = state.firstName + " " + state.lastName
            userData.name = name
            userData.role = state.role

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

              userData.password = state.password
              dispatch({
                type: 'ADD_REGISTERED_USER',
                payload: {
                  user:userData
                }
              });

            props.updateTitle('Home')
            if(state.role=="admin")
            {
                redirectToAdminHome();
            }
            else{
                redirectToTeamMemberHome(); 
            }
            const payload={
                "role":state.role,
                "firstName":state.firstName,
                "lastName":state.lastName,
                "email":state.email,
                
            }
            axios.post(API_BASE_URL+'/user/register', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        })) 
                        let userData = {}
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
                        if(userData.role == "admin")
                        {
                            redirectToAdminHome();
                        }
                        else{
                            redirectToTeamMemberHome(); 
                        }
                        
                        //props.showError(null)
                    } else{
                      //  props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });        
    }
    const redirectToAdminHome = () => {
        props.updateTitle('Home')
        props.history.push('/admin');
    }
    const redirectToTeamMemberHome = () => {
        props.updateTitle('Home')
        props.history.push('/teamMember');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
            e.preventDefault();
            if (validateForm()) {
            sendDetailsToServer() 
            }   
    }
    const isValidPassword=(password)=> {
        let result = passwordRegex.test(password)
        return result
      }

    const validateForm=()=> {
        if (!isEmpty(state.role) && !isEmpty(state.firstName) && !isEmpty(state.lastName) && !isEmpty(state.email) && !isEmpty(state.password) && !isEmpty(state.confirmPassword) &&
          isEmpty(formErrors.role) && isEmpty(formErrors.firstName) && isEmpty(formErrors.lastName) && isEmpty(formErrors.email) &&  isEmpty(formErrors.password) 
         ) {
          return true;
        }
        else if (isEmpty(state.role)) {
            inputRefRole.current.focus();
                 setFormErrors(prevState => ({
                   ...prevState,
                   role: "Please provide role"
                 }))
            return false;
          }
        else if (isEmpty(state.firstName)) {
            inputRefFirstName.current.focus();
            setFormErrors(prevState => ({
                ...prevState,
                firstName: "Please provide firstName"
              }))
              setVisibleError(prevState => ({
                 ...prevState,
                 firstName:true
             }))
            return false;
          }
        else if (isEmpty(state.lastName)) {
            inputRefLastName.current.focus();
            setFormErrors(prevState => ({
                ...prevState,
                lastName: "Please provide lastName"
              }))
              setVisibleError(prevState => ({
                 ...prevState,
                 lastName:true
             }))
            return false;
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
        else if (isEmpty(state.confirmPassword)) {
            inputRefConfirmPassword.current.focus();
            setFormErrors(prevState => ({
                ...prevState,
                confirmPassword: "Please provide confirm password"
              }))
              setVisibleError(prevState => ({
                 ...prevState,
                 confirmPassword:true
             }))
          return false;
            }
          else if (state.confirmPassword != state.password) {
            inputRefConfirmPassword.current.focus();
            setFormErrors(prevState => ({
                ...prevState,
                confirmPassword: "Passwords do not match"
              }))
              setVisibleError(prevState => ({
                 ...prevState,
                 confirmPassword:true
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
            case "firstName":
                setVisibleError(prevState => ({
                    ...prevState,
                    firstName: value
                }))
                break;
            case "lastName":
                setVisibleError(prevState => ({
                    ...prevState,
                    lastName: value
                }))
                break;
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
            case "confirmPassword":
                setVisibleError(prevState => ({
                    ...prevState,
                    confirmPassword: value
                }))
                break;
            default:
                break;
        }
    }
    
    return(
      <div className="d-flex align-items-center flex-column">
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form className="p-16px">

            <div className="form-group text-left m-t-8px" >
            <label htmlFor="exampleInputEmail1">Role</label>
                    <select className="form-control"  id={"role"}  ref={inputRefRole}  value={state.role} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teamMember">Team Member</option>
                    </select>
                    <div className="m-2">
                        {!isEmpty(formErrors.role) && (
                          <span className="errorMessage">{formErrors.role} </span>
                        )}
                      </div>
                </div>

                <div className="form-group text-left m-t-8px">
                <label htmlFor="exampleInputEmail1">First Name</label>
                <input type="text" 
                       className="form-control" 
                       id="firstName" 
                       ref={inputRefFirstName}
                       aria-describedby="emailHelp" 
                       placeholder="Enter first name" 
                       value={state.firstName}
                       onChange={handleChange}
                       autoComplete="off"
                       spellCheck="false"
                       onFocus={() =>hideErrorMsg("firstName")}
                       onBlur={() =>showErrorMsg("firstName")}
                />
                 <div className="m-2">
                        {formErrors.firstName.length > 0 && visibleError.firstName && (
                          <span className="errorMessage">{formErrors.firstName} </span>
                        )}
                      </div>
                </div>
                <div className="form-group text-left m-t-8px">
                <label htmlFor="exampleInputEmail1">Last Name</label>
                <input type="text" 
                       className="form-control" 
                       id="lastName" 
                       ref={inputRefLastName}
                       aria-describedby="emailHelp" 
                       placeholder="Enter last Name" 
                       value={state.lastName}
                       onChange={handleChange}
                       autoComplete="off"
                       spellCheck="false"
                       onFocus={() =>hideErrorMsg("lastName")}
                       onBlur={() =>showErrorMsg("lastName")}
                />  
                 <div className="m-2">
                        {formErrors.lastName.length > 0 && visibleError.lastName && (
                          <span className="errorMessage">{formErrors.lastName} </span>
                        )}
                      </div>             
                </div>

                <div className="form-group text-left m-t-8px">
                <label htmlFor="exampleInputEmail1">Email address</label>
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
                       maxLength='130'
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
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        ref={inputRefConfirmPassword}
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                        autoComplete="off"
                        spellCheck="false"
                        onFocus={() =>hideErrorMsg("confirmPassword")}
                        onBlur={() =>showErrorMsg("confirmPassword")}
                    />
                     <div className="m-2">
                        {formErrors.confirmPassword.length > 0 && visibleError.confirmPassword && (
                          <span className="errorMessage">{formErrors.confirmPassword} </span>
                        )}
                      </div>
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={e => handleSubmitClick(e)}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2 p-b-16px">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm)
