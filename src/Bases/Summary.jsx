import X from "../Assets/X";

function Summary({ onClose, summary }) {
    
    const summaryData =
        !summary || summary.length === 0 ? (
            <p style={style.text}>No Data Found For This Month.</p>
        ) : (
            <ul style={style.text}>
                {summary.map((s, index) => (
                    <li key={index}>
                        For a total of {s.count} days you consistently did {s.tag.toLowerCase()} ({s.percent}%).
                    </li>
                ))}
            </ul>
        );

    return (
        <div style={style.box}>
            <X onClick={onClose} />
            {summaryData}
        </div>
    );
}

export default Summary;

const style = {
    box: {
        position: "absolute",
        width: "800px",
        height: "350px",
        backgroundColor: "black",
        padding: "20px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
        overflow: "auto",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "1px solid #00B4D8",
    },
    text: {
        color: "#750D37",
        flexGrow: 1,
        resize: "none",
        width: "auto",
        height: "auto",
        margin: "15px",
        boxSizing: "border-box",
        border: "none",
        outline: "none",
        backgroundColor: "black",
        fontWeight: "100"
    }
}