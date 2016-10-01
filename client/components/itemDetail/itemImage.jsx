/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from "react";
import DropZone from "react-dropzone";


const ItemImage = ({itemPreview, onDrop}) => {
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
        display: "block",
        height: `${imageBoxLength}${unitOfMeasure}`,
        width: `${imageBoxLength}${unitOfMeasure}`,
        margin: "0 auto",
        textAlign: "center",
        verticalAlign: "middle",
        cursor: "pointer",
        backgroundImage: `url(${itemPreview})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        lineHeight: `${imageBoxLength - imageBoxLength / 10}${unitOfMeasure}`
    };

    let imageContent = !!itemPreview
        ? (<div style={imageItem} />)
        : (<div style={imageItem}>Drag/Click Here</div>);

    return (
        <div style={imagePlaceholderContainer}>
            <DropZone style={imageContainer} onDrop={onDrop}>
                {imageContent}
            </DropZone>
        </div>
    );
};

ItemImage.propTypes = {
    onDrop: PropTypes.func.isRequired,
    itemPreview: PropTypes.string.isRequired
};

export default ItemImage;