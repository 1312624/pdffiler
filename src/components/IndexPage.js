import React, { Component, PropTypes } from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';

export default class IndexPage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        let dataObject = {
            first_name : this.refs.firstname.value,
            last_name: this.refs.lastname.value,
            dob: this.refs.birthday.value,
            address : this.refs.address.value,
            phone: this.refs.phone.value,
            cur_school: this.refs.cur_school.value,
            email: this.refs.email.value
        }
        request
            .post('/api/users')
            .send(dataObject)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                browserHistory.push({
                    pathname: `/users/${res.body.result._id}`,
                    state: {
                        name: `${res.body.result.first_name} ${res.body.result.last_name}`,
                        id: res.body.result._id
                    }
                });
            });
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="row">
                        <form className="form-inline">
                            <div className="form-group">
                                <label for="first_name">First Name</label>
                                <input ref="firstname" type="text" className="form-control" id="first_name" />
                            </div>
                            <div className="form-group">
                                <label for="last_name">Last Name</label>
                                <input ref="lastname" type="text" className="form-control" id="last_name" />
                            </div>
                            <div className="form-group">
                                <label for="dob">Date Of Birth</label>
                                <input ref="birthday" type="date" className="form-control" id="dob" />
                            </div>
                        </form>
                    </div>
                    <br />
                    <div className="row">
                        <form className="form-inline">
                            <div className="form-group">
                                <label for="address">Address</label>
                                <input ref="address" type="text" className="form-control" id="address" />
                            </div>
                            <div className="form-group">
                                <label for="cur_school">Your College</label>
                                <input ref="cur_school" type="text" className="form-control" id="cur_school" />
                            </div>
                            <div className="form-group">
                                <label for="phone">Phone Number</label>
                                <input ref="phone" type="text" className="form-control" id="phone" />
                            </div>
                        </form>
                    </div>
                    
                    <br />
                    <div className="row">
                        <form className="form-inline">
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input ref="email" type="text" className="form-control" id="email" />
                            </div>
                        </form>
                    </div>
                    <br />
                    <div class="row">
                        <button type="submit" className="btn btn-primary col-md-offset-4" onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </div>
                </form>
            </div >
        );
    }
}