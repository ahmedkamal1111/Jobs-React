import React from 'react';
import * as style from "./Cover.module.css";

const Cover = () => (
        <div className={style.gridCoverContainer}>
            <div className={style.gridLeftInfo}>
                <h1>Teqenia Jobs</h1>  
                <p>Join us — and help every create for the web</p> 
            </div>
            <div className={style.gridRightInfo}>
                <p>We're on a mission to reinvent web, UX, product, and content design — by making it visual</p> 
                <p> If that sounds good to you, you should apply.
                    (Yes, we are remote-friendly, thanks for asking).
                </p>
            </div>
        </div>
)

export default Cover;