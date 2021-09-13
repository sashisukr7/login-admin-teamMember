import React, { useEffect ,useState} from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiConstants';
import axios from 'axios';
import '../../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import HOC from '../../../hoc/auth.guard';


function Home(props) {
    const dispatch = useDispatch();
    const openPollList1 = useSelector(state => state.pollListReducer.pollList);
    const TeamMemberPollListRequest = () => {
        return (openPollList1.filter((item) => item.status != "close"))
    }
    let openPollList = TeamMemberPollListRequest();
    openPollList=openPollList.map((item)=>
    {
        return {...item,selectedId:""}
    })
    const [openPollListState, setOpenPollListState]=useState(openPollList);
    const [selectedOptionArray , setSelectedOptionArray]=useState([]);

   // const openPollList = useSelector(state => state.pollListReducer.TEAM_MEMBER_POLLLIST_REQUEST);
    useEffect(() => {
        axios.get(API_BASE_URL + '/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status !== 200) {
                    //   redirectToLogin()
                }
            })
            .catch(function (error) {
                // redirectToLogin()
            });
    },[])
    function redirectToLogin() {
        // props.history.push('/login');
    }

    const handleSelectOption = (questionId,optionId) => {
        //api call user Response or take all array in same structure of question option,
       //setSelectedOptionArray
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
       
        //submit "selectedOptionArray" to api with userId (questionId,optionId,userId)
        console.log("selectedOptionArray", selectedOptionArray)
    }

    return (
        <>
          <div className="container-poll-request-list m-t-16px">
                    <h3 className="">Poll Request List</h3>
                    {
                      openPollListState && (openPollListState).map((item, index) => (
                            <div className="mt-4 bg-poll-item">
                                <div className="bg-light">{index+1}. {item.question}</div>
                                 {  
                                  
                                  (item.options).map((optionItem, ItemIndex) => (
                                  
                                    <div className="pollOption-radio-hover" onClick={()=>handleSelectOption(item.id, optionItem.id)}>
                                         { console.log("sitem",item)}
                                        <input className="radio-custom" name={`pollOption ${index}`} type="radio" value={optionItem.id} checked={item.selectedId == optionItem.id} />
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
        </>

    )
}

export default HOC(Home)
