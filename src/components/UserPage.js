import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSchool: []
        };
    }

    componentWillMount() {
        let self = this;
        request
            .get('/api/schools')
            .set('Accept', 'application/json')
            .end(function (err, res) {
                self.setState({ 'listSchool': res.body });
            });
    }

    render() {
        let marginLeft = {
            marginLeft: "10px"
        };

        return (
            <div className="container">
                <form className="form-inline">
                    <div className="form-group">
                        Xin chào: <label style={marginLeft}>{this.props.location.state.name} </label>
                        <div className="btn-group" style={marginLeft}>
                            <button type="button" className="btn btn-info">Choose Your School</button>
                            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="caret"></span>
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    this.state.listSchool.map(school => {
                                        return (
                                            <li key={school._id}>
                                                <Link to={{ pathname : '/schools', query : { id : school._id, user : this.props.location.state.id }}}>
                                                    {school.TenTruong}
                                                </Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}