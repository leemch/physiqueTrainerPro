import React, { Component } from 'react';

const MenuWithLogo = (props) => (
    <div className="card">       
        <div className="card-header text-center">
            <img src="https://nykenavbarassets.s3-us-west-1.amazonaws.com/logo_black.png" className="card-img-top" style={{ width: '150px' }}/>
            <h1 className="display-4 text-center">{props.title}</h1>
            <p className="lead text-center">{props.caption}</p>
        </div>

        <div className="card-body">
            {props.children}
        </div>

    </div>
)


export default MenuWithLogo;