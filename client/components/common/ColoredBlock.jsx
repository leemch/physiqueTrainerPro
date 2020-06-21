import React, { Component } from "react";

const ColoredBlock = ({ title, onClick, bgcolor, icon }) => (
        <span className={`card text-center ${bgcolor} text-white mb-3`} style={{"width": "18rem"}}>
            <div className="card-body">
                <h3>{title}</h3>
                <h4 className="display-4">
                    <i className={icon}></i>
                    6
				</h4>
                <button className="btn btn-outline-light btn-sm">View</button>
            </div>
        </span>
);

export default ColoredBlock;
