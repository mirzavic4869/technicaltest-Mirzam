import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/dist/client/router";

function index() {
	const token = getCookie("token");
	const router = useRouter();
	const [total, setTotal] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		const requestOptions = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		fetch("http://94.74.86.174:8080/api/checklist", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { code, data } = result;
				if (code === 200) {
					console.log(data);
					setDatas(data);
				}
			})
			.catch((error) => alert(error.toString()))
			.finally(() => setLoading(false));
	};
	return <div>To Do List</div>;
}

export default index;
