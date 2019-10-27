import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from '../presentational/Header';
import Input from '../presentational/Input.jsx';

class FormContainer extends Component {
    constructor() {
        super()
        this.state = {
            title: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value})
    }

    render() {
        const { title } = this.state;

        return (
            <form id="article-form">
                <Input
                    text="Search"
                    label="seo_title"
                    type="text"
                    id="seo_title"
                    value={title}
                    handleChange={this.handleChange}
                />
            </form>
        )
    }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
//Export it so it can be outputted
export default FormContainer;