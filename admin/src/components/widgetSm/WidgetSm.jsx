import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import {userRequest} from "../../requestMethods" 

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    const getUsers= async ()=>{
      const res = await userRequest.get("users/?new=true")
      setUsers(res.data)
    }
    getUsers()
  },[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user=>(
          <li className="widgetSmListItem">
            <img
              src={user.img || "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser" key={user._id}>
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">Software Engineer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}