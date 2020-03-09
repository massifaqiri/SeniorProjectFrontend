import React from 'react';
import { Button } from 'react-bootstrap';

// Custom Imports
import "./Home.css";
import ControlledCarousel from "./Slideshow";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exampleAPICallData: [],
        }
    }

    componentDidMount() {
        fetch('https://h1xqnteg60.execute-api.us-east-2.amazonaws.com/SelectProd?table=Textbooks&field=book_author')
        .then(res => res.json())
        .then(json => {
            this.setState({
                exampleAPICallData: json,
            })
        });
    }

    render() {
        return (
            <div className="Home">
                <ControlledCarousel id="slideshow"/>
                <div className="text-center">
                    <a href="/signin"><Button variant="success">Sign In</Button></a>
                    <a href="/createaccount"><Button variant="secondary">Create Account</Button></a>
                </div>
                <ul>
                    {this.state.exampleAPICallData.map(item => (
                        <li>
                            {item.book_author}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Home;