import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userStats, setUserStats] = useState([]) 

  const MONTHS = useMemo(()=>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  [])

  useEffect(()=>{
    const getStats = async ()=> {
      try {
        const res = await userRequest.get("/users/stats")
        res.data.map((item)=>
          setUserStats((prev)=>[
            ...prev.slice(0,item._id-1),
            Object.assign({}, prev[item._id-1], {name: MONTHS[item._id-1], "Active User":item.total}),
            ...prev.slice(item._id)
          ])
        )
      } catch (error) {
        console.error(error)
      }
    }
    getStats()
  },[MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
