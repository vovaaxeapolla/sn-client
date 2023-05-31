import classes from './Loader.module.css';
import React from 'react';
export default function Loader(){
    return(
        <div className={classes.loader}>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
            
        </div>
    );
}