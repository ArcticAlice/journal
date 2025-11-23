function Remove( {width = "25px", height = "25px", color = "#750D37", stroke = "#750D37", strokeWidth = 1, ...props} ) {

    const style = {
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
            {...props}
        >
            <path d="M200-440v-80h560v80H200Z"/>
        </svg>
    );

}

export default Remove;