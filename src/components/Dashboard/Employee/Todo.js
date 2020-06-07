import React from "react"
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="bg-white pa2">
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
            </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add 
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
}

class TodoList extends React.Component {
    onDelete(Lid) {
        //const li = document.getElementById(Lid)
        const btn = document.getElementById(Lid)
        //console.log(btn)
        if (btn != null) {
            btn.addEventListener('click', (e) => {
                console.log(btn.parentElement.remove())
            })
        }
        // del.parentElement.remove()
    }
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id} >{item.text} <button id={item.id+1} onClick={this.onDelete(item.id+1)}>Remove</button></li>
                ))}
            </ul>
        );
    }
}
export default TodoApp