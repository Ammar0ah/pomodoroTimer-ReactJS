import * as actionTypes from '../../types/TimerTypes';
const initialState = {
  sessionIndex: 0,
  sessionEnded: false,
  sessionRests: 0,
  sessions: [
    {
      rounds: 0,
      rests: 0,
      skips: 0,
    },
  ],
  min:0,
  time: {
    min: 0,
    sec: 1,
  },
};
const sessionReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TIMER_TRAIN:      
        return {
          ...state,
          sessions: update(state,"rounds"),
        };
      
    case actionTypes.TIMER_REST_ROUND:
      return {
        ...state,
        sessions: update(state,"rests"),
        time: {min: 10, sec: 0},
      };
    case actionTypes.TIMER_REST_SESSION:
      console.log()
      return{
        ...state,
        sessionRests:state.sessionRests++,
        time:{min:25,sec:0}
      }
    case actionTypes.TIMER_Next_ROUND:
      console.log(state.sessions)
      // let obj = {rounds:state.sessions[sessionIndex].rounds+=1}
      return {
        ...state, 
        time:{min:0,sec:1},
        sessions: update(state,"rounds")
      };
      case actionTypes.TIMIER_Next_SESSION:
        console.log("next session")
        let newIndex = state.sessionIndex+=1
        let newSession = [...state.sessions,{rounds: 1, rests: 0, skips: 1}]
        console.log("new session",newSession)
        let timeObj = {min:25 ,sec:0}
        return {
          ...state,
          sessionEnded:true,
          time: Object.assign({min:25,sec:0},state.time),
          sessionIndex: newIndex,
          sessions: newSession,
        };
      case actionTypes.ADD_DATA:
        console.log("sessions",)
        return {
          ...state,
          sessions:action.payload
        }
      default:
      return {
        ...state,
      };
  }
};
let update = (state,value) =>{
let newOb = state.sessions
let tempObj = newOb[state.sessionIndex]

tempObj[value]+=1
newOb[state.sessionIndex] = tempObj
return newOb
}
export default sessionReducers;
