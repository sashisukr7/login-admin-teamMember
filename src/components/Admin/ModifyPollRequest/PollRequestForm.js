
import React, { useEffect, useState, useRef,useMemo } from 'react';
import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import {generateRandomValue,isEmptyObject} from '../../../util/apputils';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
const PollRequestForm = ({fromPage}) => {
    const dispatch = useDispatch();
    let history = useHistory();
    let {pollRequestId} = useParams();
    const inputRefQuestion = useRef(null);
    const inputRefOption = useRef(null);
    const [showAddPollForm, setShowAddPollForm] = useState(false);
    const pollRequestById = useSelector(state => state.pollListReducer.pollRequestById);
    const [reRenderToggle,setReRenderToggle]=useState(false);
    const pollRequestByIdfunction=useMemo(() =>
    {
      return pollRequestById
    },[reRenderToggle])

   
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


    useEffect(async() => {
        if(fromPage=="modifyPollRequest") 
        {
            dispatch({
                type: 'POLL_REQUEST_BY_ID',
                payload: {
                   id:pollRequestId
                }
              });
              setReRenderToggle(!reRenderToggle);
              let pollListItem =  pollRequestByIdfunction;
             !isEmptyObject(pollListItem) && setNumberOfOptions(pollListItem.options.length);
              let options= !isEmptyObject(pollListItem)  && (pollListItem.options).map((item,index)=>
              {
               return item.option
              });

              setState(prevState => ({
                ...prevState,
                question: pollListItem.question,
                options: options
            }))
            
        } 
       
    }, [pollRequestById])
   


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
        //call submit to parents
        e.preventDefault();
        let pollListItem = {}
        let ran=(fromPage=="modifyPollRequest")?pollRequestById.id:generateRandomValue();
        pollListItem.id = ran
        pollListItem.question = state.question;
        pollListItem.status="open";
        pollListItem.options=[];
        let op=[];
       
        (state.options).map((item,index)=>
        {
           let ran1=(fromPage=="modifyPollRequest")?(index>pollRequestById.options.length-1?generateRandomValue():pollRequestById.options[index].id):generateRandomValue();
            pollListItem.options.push({id:ran1,option:item});
            op.push("")
        })
       /// console.log("statess",state)
       //console.log("pollListItem01",pollListItem);
          dispatch({
            type: 'EDIT_POLL_REQUEST_BY_ID',
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
        history.goBack();
    }

    const handlePlusOption = (e) => {
        e.preventDefault()
        setNumberOfOptions(numberOfOptions+1)

    }
    
    return (
        <>
            <div className="d-flex align-items-center flex-column" >
                <div className="card col-12 col-lg-4 login-card  mt-2 hv-center p-64px-16px " style={{display:showAddPollForm?"block":"block" }}>
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
               <button className="btn btn-primary btn-lg m-t-16px"  onClick={submitPollRequest}>{fromPage=="modifyPollRequest"?"Update":"Submit"}</button>
                 </div>
                 </form>
                 </div>

            </div>
        </>

    )
}

export default  PollRequestForm