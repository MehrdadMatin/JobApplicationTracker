import {useState, useEffect} from "react"
export default () => {
	const [state, setState] = useState([])
	useEffect(() => {
		fetch("/api/notifications").then(resp => resp.json()).then(setState)
	}, [])
	return (<>
		<h1>Notifications</h1>
		<ul>
			{state.map(({message, pub_date}, i) => <li key={i}>
				{pub_date}: {message}
			</li>)}
		</ul>
	</>)
}
