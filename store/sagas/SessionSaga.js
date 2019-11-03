import {takeLatest,put,takeEvery} from 'redux-saga/effects'
import * as actionTypes from '../../types/TimerTypes'
import sessionReducers from '../reducers/sessionReducer'
import axios from '../../axios-requests'
 function* get_sessions(){
    try {
        const res = yield axios.get('get_sessions')
        console.log(res.data)
        yield put({type:actionTypes.ADD_DATA,payload:res.data})
    } catch (err) {
        
    }
    
   
}
function *next_Session(){
    yield put({type:actionTypes.TIMIER_Next_SESSION})
}

function* start(){
    yield takeLatest(actionTypes.GET_SESSIONS,get_sessions)
    yield takeEvery(actionTypes.TIMER_FINISHED_SESSION,next_Session)
}
export default start