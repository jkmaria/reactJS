


function Button (props) {
   console.log(props)

  
   const buttonStyle={
    backgroundColor: props.bgColor,
    borderRadius: props.borderRadius,
    marginTop: props.marginTop,
    marginRight: props.marginRight,
    marginButton: props.marginButton
   }

    return (
        <div>
            <button className={props.className} style={buttonStyle} onClick={props.onClick}>{props.children} </button>
        </div>
    )
}

export default Button;