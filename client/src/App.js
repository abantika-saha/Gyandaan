import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import AuthStudent from './components/AuthStudent/AuthStudent'
import AuthVolunteer from './components/AuthVolunteer/AuthVolunteer'
import Discussion from './components/Discussion/Discussion'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import BookMeeting from './components/BookMeeting/BookMeeting'
import AvailableTimings from './components/AvailableTimings/AvailableTimings'
import MyBookings from './components/MyBookings/MyBookings'
import MyMeetings from './components/MyMeetings/MyMeetings'

import Createblogs from './components/Blogs/Createblogs'
import Blogs from './components/Blogs/Blogs'
import DoubtDetails from './components/DoubtDetails/DoubtDetails'
import Resources from './components/Resources/Resources'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'
import VolunteerLeaderboard from './components/VolunteerLeaderboard/VolunteerLeaderboard'
import Admin from './components/AdminPanel/Admin'
import { useDispatch } from "react-redux";
import { getMeetings } from "./actions/meetings";
import AuthAdmin from './components/AuthAdmin/AuthAdmin'


const App = () => {


    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/auth/student" component={AuthStudent} />  
                <Route exact path="/auth/volunteer" component={AuthVolunteer} />
                <Route exact path="/student/bookMeeting" component={BookMeeting} />  
                <Route exact path="/volunteer/availableTimings" component={AvailableTimings} /> 
                <Route exact path="/student/myBookings" component={MyBookings} /> 
                <Route exact path="/volunteer/myMeetings" component={MyMeetings} />

                <Route exact path="/auth/volunteer" component={AuthVolunteer} />  
                <Route exact path="/blogs/create" component={Createblogs}/>
                <Route exact path="/blogs" component={Blogs}/>
                <Route exact path="/auth/volunteer" component={AuthVolunteer} /> 
                <Route exact path="/discussion" component={Discussion} /> 
                <Route exact path="/discussion/:id" component={DoubtDetails} />
                <Route exact path="/resources" component={Resources} /> 
                <Route exact path="/leaderboard" component={LeaderBoard} /> 
                <Route exact path="/volunteerLeaderboard" component={VolunteerLeaderboard} />
                <Route exact path="/auth/admin" component={AuthAdmin} />  
                <Route exact path="/admin" component={Admin} /> 
            </Switch>
        </BrowserRouter>
    )
}

export default App;