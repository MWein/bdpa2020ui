import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

const cookies = new Cookies()
export const addTicket = async flight_id => {
    const token = cookies.get("userToken"), username = cookies.get("username")
    const headers = { Authorization: `Bearer ${token}` }
    const postBody = { username, flight_id }
    const addTicketURL = baseUserURL + '/ticket/add'
    try {
        const response = await superagent.post(addTicketURL, postBody).set(headers)
        console.log("addTicket response", response)
        return true
    } catch (err) { console.log(err) }
    return false
}
export const requestUserTickets = async username => {
    console.log("Requesting tickets", username)
    const token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/ticket/get'
    try {
        const response = await superagent.get(getUrl, username).set(headers)
        return response.body
    } catch (err) {
        if (err.status === 400) console.log("User not Found")
        if (err.status === 401) console.log("Unauthorized")
        else console.log("error", err)
    }
    return false
}