import Navbar from "../components/Navbar";
import InputCustom from "../components/InputCustom";
import { AddButton } from "../components/CustomButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie, getCookie } from "cookies-next";

export default function Home() {
	const router = useRouter();
	const token = getCookie("token");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (token) {
			router.push("/");
		}
	}, []);

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const body = {
			password,
			username,
		};
		let requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		};
		fetch("http://94.74.86.174:8080/api/login", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				const { code, data, message } = result;
				if (code === 200) {
					const { token } = data;
					setCookie("token", token);
					router.push("/homepage");
				}

				alert(message);
			})
			.catch((err) => alert(err.toString()))
			.finally(() => setLoading(false));
	};
	return (
		<>
			<Navbar />
			<div className="min-h-screen flex justify-center flex-col items-center bg-base-100">
				<div className="hidden md:block my-10"></div>
				<div className="h-1/2 ">
					<div className="mb-10">
						<h1 className="text-black font-Roboto font-extrabold text-5xl md:text-6xl">
							Welcome!
						</h1>
						<h4 className="text-black/50 font-Roboto text-2xl italic md:text-3xl">
							Sign in to continue
						</h4>
					</div>

					{/* form login */}
					<form onSubmit={(e) => handleSubmit(e)}>
						<InputCustom
							id="input-username"
							type="text"
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
						/>
						<InputCustom
							id="input-password"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>

						<div className="mt-2 w-full">
							<AddButton loading={loading} id="btn-login" title="sign in" />
						</div>
					</form>

					{/* under text */}
					<div className="flex mt-4 font-Poppins font-normal md:text-lg lg:justify-center lg:text-xl">
						<h5 className="text-black ">Don`t have account?</h5>
						<Link href="/auth/register">
							<a id="to-register" className="text-primary ml-2">
								Register
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
