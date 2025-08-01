import Remove from "../Assets/Remove";

function Template({ entry, onDelete }) {

    const Style = {
        position: "relative",
        width: "90%",
        height: "5vh",
        padding: "5px",
        paddingLeft: "20px",
        border: "1px solid #A663CC",
        marginBottom: "10px",
        borderRadius: "5px",
        display: "grid",
        gridTemplateColumns: "10fr 1fr",
        alignItems: "center",
        backgroundColor: "black",
        margin: "0"
    };

    const textStyle = {
        verticalAlign: "center",
        padding: "0",
        margin: "0",
        letterSpacing: "2px",
        color: "white",
    };

    return (
        <div style={Style}>
            <p style={textStyle}>{entry}</p>
            <Remove onClick={onDelete} color="white" />
        </div>
    );
}


export default Template;
