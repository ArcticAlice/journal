function left( {width = "50px", height = "50px", color = "#750D37", stroke = "white", strokeWidth = 1, ...props} ) {

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
            <path d="M640-200 200-480l440-280v560Zm-80-280Zm0 134v-268L350-480l210 134Z"/>
        </svg>
    );

}

export default left;
