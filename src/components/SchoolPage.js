import React, { Component } from 'react';
import request from 'superagent';
//import Spinner from 'react-spinkit';
import Loading from 'react-loading';

export default class SchoolPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            school: {},
            filledForm: '',
            isLoading: false,
            isDone: false
        };
    }

    componentWillMount() {
        let self = this;
        request
            .get(`/api/schools/${this.props.location.query.id}`)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                self.setState({ school: { name: res.body.TenTruong }, filledForm: res.body.BieuMau });
            });

        request
            .get(`/api/users/${this.props.location.query.user}`)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                self.setState({
                    user: {
                        name: `${res.body.result.first_name} ${res.body.result.last_name}`,
                        dob: res.body.result.dob,
                        cur_school: res.body.result.cur_school,
                        address: res.body.result.address,
                        phone: res.body.result.phone
                    }
                });
                self.setState({ isLoading: true });
            });
    }

    previewForm() {
        let self = this;
        this.setState({ isDone : false });
        request
            .get(`/api/form?user=${this.props.location.query.user}&school=${this.props.location.query.id}`)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                self.setState({ isDone : true });
                self.setState({ filledForm: res.body.data });
                $('#previewFile').modal('show');
            });
    }

    render() {
        let previewStyle = {
            width: '100%',
            height: '80vh'
        }

        let marginLeft = {
            marginLeft: "10px"
        };
        const isLoading = this.state.isLoading;
        return (
            <div>
                {!isLoading ?
                    (
                        <div className="row">
                            <h1 className="col-md-offset-5">Waiting for loading.....</h1>
                            <div className="col-md-offset-6">
                                <Loading type='spinningBubbles' color='#e3e3e3' />
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4">
                                    <div className="panel panel-info">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Infomation</h3>
                                        </div>
                                        <div className="panel-body">
                                            Your Name : {this.state.user.name}
                                            <br />
                                            Your Target School : {this.state.school.name}
                                            <br />
                                            Your Birth Day : {this.state.user.dob}
                                            <br />
                                            Your Current School : {this.state.user.cur_school}
                                            <br />
                                            Your Address : {this.state.user.address}
                                            <br />
                                            Your Phone : {this.state.user.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 col-md-offset-4">
                                    <b>This is your Information Form: </b>
                                    <button type="button" className="btn btn-primary" onClick={this.previewForm.bind(this)}>Preview</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-offset-5" id="loader">
                                    { this.state.isDone ? (
                                        <Loading type='spinningBubbles' color='#e3e3e3' />
                                    ) : (<div></div>)}
                                </div>
                            </div>

                            <div className="modal fade" id="previewFile" tabindex="-1" role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title">Preview</h4>
                                        </div>
                                        <div className="modal-body">
                                            <embed src={this.state.filledForm} type="application/pdf" style={previewStyle} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}