import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export default makeStyles((theme)=>({
    root:{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    card:{
        width: 275,
        border: "1px solid blue"
    },
    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50rem",
        height:"30rem",
        background:"white",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        padding:"1rem",
        overFlowY:"scroll"
    },
    avatar:{
        background:"#fc5f53"
    },
    delete:{
        color:"tomato"
    }
}))