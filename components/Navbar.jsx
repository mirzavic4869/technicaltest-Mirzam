import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();
	return (
		<div className="navbar bg-amber-400">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">ToDoList</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li>
						<button
							className="font-bold text-xl"
							onClick={() => router.push("/pages/auth/login")}
						>
							LOGIN
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
