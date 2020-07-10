import axios from 'axios';

const DEF_URL = "http://localhost:8080/";
	
class ApiService {
	selectUsers() {
		return axios.post(DEF_URL + "json.do", {query: "operation"});
	}
}

export default new ApiService();