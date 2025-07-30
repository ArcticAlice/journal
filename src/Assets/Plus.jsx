function Plus({ width = "50px", height = "50px", color = "#00B4D8", stroke = "black", strokeWidth = 25, ...props }) {
    
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
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
    );
}

export default Plus;
