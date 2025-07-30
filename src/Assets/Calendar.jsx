function Calendar({ width = "40px", height = "40px", color = "#00B4D8", stroke = "white", strokeWidth = 1, ...props }) {
    
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
            {...props} // Spread additional props, including onClick
        >
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm80 240v-80h400v80H280Zm0 160v-80h280v80H280Z" />
        </svg>
    );
}

export default Calendar;
