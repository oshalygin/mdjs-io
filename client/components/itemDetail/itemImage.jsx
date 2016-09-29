import React, { PropTypes } from "react";
import DropZone from "react-dropzone";

const imageBoxLength = 10;
const unitOfMeasure = "em";
const imageBorderColor = "rgb(33,150,243)";

const imagePlaceholderContainer = {
    position: "relative",
    width: "25em",
    height: "25em",
    float: "right"
};
const imageContainer = {
    position: "absolute",
    margin: `-${imageBoxLength / 2}${unitOfMeasure} auto`,
    width: "100%",
    height: `${imageBoxLength}${unitOfMeasure}`,
    top: "50%"
};
const imageItem = {
    border: `0.5em solid ${imageBorderColor}`,
    borderRadius: "1.5em",
    height: `${imageBoxLength}${unitOfMeasure}`,
    width: `${imageBoxLength}${unitOfMeasure}`,
    margin: "0 auto",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: `${imageBoxLength - imageBoxLength/10}${unitOfMeasure}`
};

function readFiles(files) {
    console.log(files);
}

const ItemImage = () => {
    return (
        <div style={imagePlaceholderContainer}>
            <DropZone style={imageContainer} onDrop={(files) => readFiles(files)}>
                <div style={imageItem}>Drag/Click Here</div>
            </DropZone>
        </div>
    );
};

// <div style={imagePlaceholderContainer}>
//             <div style={imageContainer}>
//                 <div style={imageItem} />
//             </div>
//         </div>

ItemImage.propTypes = {

};

export default ItemImage;