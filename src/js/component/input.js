import React, { useState, useEffect } from "react";

export const Main = () => {
	const [inputValue, setInputValue] = React.useState("");
	const [list, setList] = React.useState([]);

	const getFetch = () => {
		fetch(
			"https://3000-4geeksacademy-flaskresth-u8u1uobunju.ws-us38.gitpod.io/todo"
		)
			.then((response) => response.json())
			.then((data) => setList(data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getFetch();
	}, []);

	let onChange = (e) => {
		const newvalue = e.target.value;
		setInputValue(newvalue);
	};

	const addTask = (e) => {
		if (e.key === "Enter") {
			fetch(
				"https://3000-4geeksacademy-flaskresth-u8u1uobunju.ws-us38.gitpod.io/todo",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						label: inputValue, // Use your own property name / key
						done: false,
					}),
				}
			)
				.then((res) => res.json())
				.then((result) => setList(result))
				.catch((err) => console.log(err));
			setInputValue("");
		}
	};

	const putFetch = (task) => {
		task.done = !task.done;

		fetch(
			"https://3000-4geeksacademy-flaskresth-u8u1uobunju.ws-us38.gitpod.io/todo/" +
				task.id,
			{
				method: "PUT",
				body: JSON.stringify(task), // data can be a `string` or  an {object} which comes from somewhere further above in our application
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((response) => {
				console.log("Success:", response);
				setList(response);
			})
			.catch((error) => console.error("Error:", error));
	};

	const deleteTask = (id) => {
		fetch(
			"https://3000-4geeksacademy-flaskresth-u8u1uobunju.ws-us38.gitpod.io/todo/" +
				id,
			{
				method: "DELETE",
			}
		)
			.then((res) => res.json())
			.then((result) => setList(result))
			.catch((err) => console.log(err));
	};

	// const markDone = (index) => {
	// 	const newTodos = list.map((task, i) => {
	// 		if (i == index) {
	// 			task.done = !task.done;
	// 			return task;
	// 		} else {
	// 			return task;
	// 		}
	// 	});
	// 	setList(newTodos);
	// 	putFetch(newTodos);
	// };

	// let addTask = (e) => {
	// 	if (e.keyCode == 13) {
	// 		setList([...list, inputValue]);
	// 		setInputValue("");
	// 	}
	// };
	// const itemRemove = (index) => {
	// 	setList(list.filter((singleTask, i) => i != index));
	// };

	// const changeColor = () => {};

	return (
		<div>
			<input
				className="input"
				placeholder=""
				onChange={onChange}
				onKeyDown={addTask}
				value={inputValue}></input>
			<ul className="list-group">
				{list.map((task, index) => {
					return (
						<li className="list-group-item d-flex" key={index}>
							<div className="between d-flex">
								<div>
									<span className={task.done ? "done2" : ""}>
										{task.label}
									</span>
								</div>
								<div className="d-flex">
									<span>
										<i
											className="far fa-trash-alt"
											onClick={() =>
												deleteTask(task.id)
											}></i>
									</span>
									<span className={task.done ? "done" : ""}>
										<i
											className="fas fa-check-square"
											onClick={() => {
												putFetch(task);
											}}></i>
									</span>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
