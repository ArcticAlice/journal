function X({ width = "20px", height = "25px", color = "#750D37", stroke = "white", strokeWidth = 1, ...props }) {

    const style = {
        position: "absolute",
        top: "3%",
        left: "1%",
        cursor: "pointer"
    }

    return (
        <svg style={style}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 -960 960 960"
            fill={color}
            stroke={stroke}
            strokeWidth={strokeWidth}
            {...props} // Spread additional props, including onClick
        >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
    );
}

export default X;
