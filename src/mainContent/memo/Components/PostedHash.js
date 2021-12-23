import React from "react";

const PostedHash = ({ hashName, isDot}) => {
    return (
        <div>
            {isDot ?
            <label style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                minWidth: "30px",
                maxWidth: "84px",
            }}>{hashName}</label>
        
            :
            <label>{hashName}</label>

            }
        </div>
    );
};

export default PostedHash;
