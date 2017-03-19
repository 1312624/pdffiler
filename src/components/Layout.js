import React, { Component } from 'react';
import Link from 'react-router';

export default class Layout extends Component {
    render() {
        return (
            <div className="app-container">
                <div className="app-header">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">PDF Filler</a>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="app-content">
                    {this.props.children}
                </div>

                <div className="app-footer">

                </div>
            </div>
        );
    }
}