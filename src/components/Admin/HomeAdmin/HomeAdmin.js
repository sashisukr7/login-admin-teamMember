import React, { useEffect, useState, useRef } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import {generateRandomValue} from '../../../util/apputils';
import HOC from '../../../hoc/auth.guard';
import { useHistory } from 'react-router-dom';

function Home(props) {
    const dispatch = useDispatch();
    const inputRefQuestion = useRef(null);
    const inputRefOption = useRef(null);
    const [showAddPollForm, setShowAddPollForm] = useState(false);
    const userList = useSelector(state => state.registedReducer.userList);
    const pollList = useSelector(state => state.pollListReducer.pollList);
    const history = useHistory();

    const [numberOfOptions, setNumberOfOptions] = useState(2)

    const [state, setState] = useState({
        question: "",
        options: [],
    })
    const [formErrors, setFormErrors] = useState({
        question: "",
        options: [],
    })
    const [visibleError, setVisibleError] = useState({
        question: "",
        options: [],
    })


    const handleClickAddPoll = () => {
        setShowAddPollForm(!showAddPollForm)
    }
    useEffect(() => {
        console.log("sssStateRAdmin", userList)
        console.log("sssStateRAdminpolllist", pollList)
        axios.get(API_BASE_URL + '/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status !== 200) {
                    //   redirectToLogin()
                }
            })
            .catch(function (error) {
                // redirectToLogin()
            });
    }, [])
    function redirectToLogin() {
        // props.history.push('/login');
    }


    const handleChange = (e,index) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))

    }

    const handleChangeOption = (e,index) => {   
       let options=state.options;
       options[index]=e.target.value;
        setState(prevState => ({
            ...prevState,
            options:options
        }))

    }
    const hideErrorMsg = (name, index) => {
        toggleErrorVisibility(name, false, index)
    }

    const showErrorMsg = (name, index) => {
        toggleErrorVisibility(name, true, index)
    }

    const toggleErrorVisibility = (name, value, index) => {
        switch (name) {
            case "question":
                setVisibleError(prevState => ({
                    ...prevState,
                    firstName: value
                }))
                break;
            case "option" + index:
                setVisibleError(prevState => ({
                    ...prevState,
                    lastName: value
                }))
                break;
            default:
                break;
        }
    }

    const renderOptions = () => {
        var optionArray = [];
        for (let i = 0; i < numberOfOptions; i++) {
            optionArray.push(<div className="form-group m-t-8px" key={i}>
                <label htmlFor="exampleInputEmail1 ">option{i+1}</label>
                <input type="text"
                    className="form-control"
                    id={`option${i}`} 
                    ref={inputRefOption}
                    aria-describedby="emailHelp"
                    placeholder="Enter Your option"
                     value={state.options[i]}
                    onChange={(e)=>handleChangeOption(e,i)}
                    autoComplete="off"
                    spellCheck="false"
                    onFocus={() => hideErrorMsg(`option${i}`)}
                    onBlur={() => showErrorMsg(`option${i}`)}
                />
                <div className="m-2">
                    {formErrors.options[i] && formErrors.options[i].length > 0 && visibleError.option[i] && (
                        <span className="errorMessage">{formErrors.option[i]} </span>
                    )}
                </div>
            </div>);
        }
        return optionArray;
    }

    const submitPollRequest = (e) => {
        e.preventDefault();
        let pollListItem = {}
        let ran=generateRandomValue();
        pollListItem.id = ran
        pollListItem.question = state.question;
        pollListItem.status="open";
        pollListItem.options=[];
        let op=[];
        (state.options).map((item,index)=>
        {
           let ran1=generateRandomValue();
            pollListItem.options.push({id:ran1,option:item});
            op.push("")
        })
          dispatch({
            type: 'ADD_POLLLIST_REQUEST',
            payload: {
                pollListItem:pollListItem
            }
          });
         
        setState(
            {
                question: "",
                options: op,
            }
        )
        setNumberOfOptions(2)
        setShowAddPollForm(false)
    }

    const handlePlusOption = (e) => {
        e.preventDefault()
        setNumberOfOptions(numberOfOptions+1)

    }
    const handleClickClosePoll = (id) => {
        {console.log("item.ida",id)}
        dispatch({
            type: 'CLOSE_POLLLIST_REQUEST',
            payload: {
                id
            }
          });
    }
    const handleClickShowChartPoll = () => {
      history.push("/pollCharts");
    }
    const handleClickEditPollItem = () => {

    }

    return (
        <>
            <div className="d-flex align-items-center flex-column" >

                <button className="btn btn-outline-primary  btn-lg m-t-16px" onClick={handleClickAddPoll}>add poll</button>
                <div className="card col-12 col-lg-4 login-card  mt-2 hv-center p-64px-16px " style={{display:showAddPollForm?"block":"none" }}>
            <form >
                <div className="form-group m-t-8px text-left">
                    <label htmlFor="exampleInputEmail1 ">Question</label>
                    <input type="text"
                        className="form-control"
                        id="question"
                        ref={inputRefQuestion}
                        aria-describedby="emailHelp"
                        placeholder="Enter Your Question"
                        value={state.question}
                        onChange={handleChange}
                        autoComplete="off"
                        spellCheck="false"
                        onFocus={() => hideErrorMsg("question")}
                        onBlur={() => showErrorMsg("question")}
                    />
                    <div className="m-2">
                        {formErrors.question.length > 0 && visibleError.question && (
                            <span className="errorMessage">{formErrors.question} </span>
                        )}
                    </div>
                {renderOptions()}
                <div className="text-left "><button className="btn bg-white text-primary"  onClick={handlePlusOption}> + option</button></div> 
               <button className="btn btn-primary btn-lg m-t-16px"  onClick={submitPollRequest}>Submit</button>
                 </div>
                 </form>
                 </div>

                <div className="container-poll-request-list m-t-16px">
                    <h3 className="">Poll Request List</h3>
                    {
                      pollList &&  (pollList).map((item, index) => (
                            <div className="mt-4 bg-poll-item">
                                <div className="bg-light">{index+1}. {item.question}</div>
                                 {  
                                  (item.options).map((optionItem, ItemIndex) => (
                                    <div className="">
                                        <div className="text-secondary">{String.fromCharCode(65 + ItemIndex)}. {optionItem.option}</div>
                                        </div>
                                ))} 
                                    <div className="">
                                    <button className="btn btn-primary m-16px" onClick={()=>handleClickClosePoll(item.id)}>{item.status=="close"?"Poll Closed":"Close Poll"}</button>
                                    <button className="btn btn-primary m-16px" onClick={()=>handleClickShowChartPoll(item.id)}>Show Chart</button>
                                    <button className="btn btn-primary m-16px" onClick={handleClickEditPollItem(item.id)}>Edit</button>
                                </div>
                                    </div>

                                ))}

                            </div>
            </div>
        </>

    )
}

export default HOC(Home)