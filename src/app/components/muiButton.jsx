import { Button } from "@mui/material"
const MuiButton = ({ label, onClick }) => {


    return <Button
        sx={{
            background: "#4165E7",
            borderRadius: "100px",
            color:"white",
            width:"max-content",
            padding:"10px 58px"

        }}
        onClick={onClick}
    >{label}</Button>

}

export default MuiButton;