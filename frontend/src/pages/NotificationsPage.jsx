import "./NotificationsPage.css"
import {useState, useEffect} from "react"
export default () => {
	const [state, setState] = useState([])
	useEffect(() => {
		fetch("/api/notifications").then(resp => resp.json()).then(setState)
	}, [])
	return (<div className="page-container">
		<h1>Notifications</h1>
		<ul>
			{state.map(({message, pub_date}, i) => <li key={i}>
				<div className="ts">{pub_date}</div>
				<div className="msg">{message}</div>
			</li>)}
		</ul>
	</div>)
}
