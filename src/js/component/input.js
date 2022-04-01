import React from "react";

export const Main = () => {
	const [inputValue, setInputValue] = React.useState("");
	const [list, setList] = React.useState([]);

	let onChange = (e) => {
		const newvalue = e.target.value;
		setInputValue(newvalue);
	};

	let addTask = (e) => {
		if (e.keyCode == 13) {
			setList([...list, inputValue]);
			setInputValue("");
		}
	};
	const itemRemove = (index) => {
		setList(list.filter((singleTask, i) => i != index));
	};

	const changeColor = () => {};

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
							{task}
							<span className="d-flex justify-content-md-end">
								<i
									className="far fa-trash-alt"
									onClick={() => itemRemove(index)}></i>
							</span>
							<span>
								<i class="fas fa-check-square"></i>
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
