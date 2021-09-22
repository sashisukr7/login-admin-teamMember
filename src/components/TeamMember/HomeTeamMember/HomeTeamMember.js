import React, { useEffect ,useState} from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import HOC from '../../../hoc/auth.guard';


function Home(props) {
    const dispatch = useDispatch();
    const openPollList1 = useSelector(state => state.pollListReducer.pollList);
    let pollResponseList = useSelector(state => state.pollResponseReducer.pollResponseList);
    let openPollList;
    const TeamMemberPollListRequest = () => {
        return (openPollList1.filter((item) => item.status != "close"))
    }
    const [openPollListState, setOpenPollListState]=useState([]);
    const [selectedOptionArray , setSelectedOptionArray]=useState([]);
    const [responseRendering, setResponseRendering]=useState(false);



   // const openPollList = useSelector(state => state.pollListReducer.TEAM_MEMBER_POLLLIST_REQUEST);
    useEffect(() => {
        window.scrollTo(0,0);
       console.log("useEffect1") 
        openPollList = TeamMemberPollListRequest();
       openPollList=openPollList.map((item)=>
       {
           for(let i in pollResponseList )
       {
           if(item.id == pollResponseList[i].requestId)
           {
               return {...item,oldSelectedId:pollResponseList[i].responseId,selectedId:pollResponseList[i].responseId}
           }
       }
           return {...item,selectedId:""}
       })
       setOpenPollListState(openPollList);
    },[responseRendering])

    
    function redirectToLogin() {
        // props.history.push('/login');
    }

    const handleSelectOption = (questionId,optionId,oldSelectedId) => {
        //api call user Response or take all array in same structure of question option,
       if(oldSelectedId)
       return

       openPollList=openPollListState;
       openPollList=openPollList.map((item)=>
       {
        if (item.id==questionId)
        {
        let item1={...item,selectedId:optionId};
        return item1
        }
        else{
            return item
        }
       })
       setOpenPollListState(openPollList)

       // for api request

       let selectedOption = {
        questionId: questionId,
        optionId: optionId,
    }

    let selectedOptions = selectedOptionArray;
    let alreadyQuestionExistIdFlag = false;
    selectedOptions = selectedOptions.map((item) => {
        if (item.questionId == questionId) {
            alreadyQuestionExistIdFlag = true;
            let item1 = { ...item, optionId: optionId };
            return item1
        }
        else {
            return item
        }

    })
    setSelectedOptionArray(selectedOptions);
    if (!alreadyQuestionExistIdFlag) {
        selectedOptions.push(selectedOption)
        setSelectedOptionArray(selectedOptions);
    }
    }
    
    const handleSubmitClick = (e) => {
        e.preventDefault();
        ///submit "selectedOptionArray" to api with userId (questionId,optionId,userId)
        console.log("selectedOptionArray", selectedOptionArray)
     let pollResponseListItem={};
     for(let i in selectedOptionArray)
     {
        pollResponseListItem.userId=localStorage.getItem("userId");
        pollResponseListItem.requestId=selectedOptionArray[i].questionId;
        pollResponseListItem.responseId=selectedOptionArray[i].optionId;
        dispatch({
            type: 'ADD_POLLLIST_RESPONSE',
            payload: {
                pollResponseListItem
            }
          });
     }
     console.log("pollResponseList",pollResponseList)
     setResponseRendering(!responseRendering)
    }

    return (
        <>
        <div className="container">
        <div className="d-flex align-items-center flex-column" >
          <div className="container-poll-request-list m-t-16px col-lg-10 col-12">
                    <h3 className="">Poll Request List</h3>
                    {
                      openPollListState && (openPollListState).map((item, index) => (
                            <div className="card login-box-shadow mt-4 bg-poll-item text-left p-16px">
                                <div className="regular-400">{index+1}. {item.question}</div>
                                 {  
                                  
                                  (item.options).map((optionItem, ItemIndex) => (
                                  
                                    <div className="pollOption-radio-hover" onClick={()=>handleSelectOption(item.id, optionItem.id, item.oldSelectedId)} >
                                         { console.log("sitem",item)}
                                        <input className="radio-custom" name={`pollOption ${index}`} disabled={item.oldSelectedId} type="radio" value={optionItem.id} checked={item.selectedId == optionItem.id} />
                                        <label className=" mx-8px">{optionItem.option}</label>
                                        </div>
                                ))} 
                              
                                    </div>

                                ))}
                     {
                      openPollListState.length>0 &&
                                  <button
                                      type="submit"
                                      className="btn btn-primary btn-lg m-t-16px"
                                      onClick={e => handleSubmitClick(e)}
                                  >
                                      Submit
                           </button>
                         }
                             
                            </div>
                            </div>
                            </div>
        </>

    )
}

export default HOC(Home)
