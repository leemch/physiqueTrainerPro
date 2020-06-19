import React, { Component } from "react";

class ColoredBlock extends Component {




    render() {
        return (
            <div>
                <div className="col-md-3">
                    <div className="card text-center bg-primary text-white mb-3">
                        <div className="card-body">
                            <h3>Posts</h3>
                            <h4 className="display-4">
                                <i className="fas fa-pencil-alt"></i> 6
												</h4>
                            <a href="posts.html" className="btn btn-outline-light btn-sm">View</a>
                        </div>
                    </div>
                    <div className="card text-center bg-success text-white mb-3">
                        <div className="card-body">
                            <h3>Categories</h3>
                            <h4 className="display-4">
                                <i className="fas fa-folder"></i> 4
												</h4>
                            <a href="categories.html" className="btn btn-outline-light btn-sm">View</a>
                        </div>
                    </div>
                    <div className="card text-center bg-warning text-white mb-3">
                        <div className="card-body">
                            <h3>Users</h3>
                            <h4 className="display-4">
                                <i className="fas fa-users"></i> 4
												</h4>
                            <a href="users.html" className="btn btn-outline-light btn-sm">View</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ColoredBlock;