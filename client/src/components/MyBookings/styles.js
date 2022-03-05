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
    avatar:{
        background:"#fc5f53"
    },
    delete:{
        color:"tomato"
    }
}))