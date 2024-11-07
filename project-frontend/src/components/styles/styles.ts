import { SxProps } from "@mui/joy/styles/types";
import { CSSProperties } from "react";


export const muiStyles :{ [key: string]: SxProps } = {

    card: {
        height: '200px',
        width: '350px', 
        padding:'2', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': {
            boxShadow: 6, 
        }
    },

    loginPageHeader : { textAlign: 'center', marginTop:4 },

    loginBoxHeader : {
        marginTop:4 ,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
      },

    loginForm : {
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        maxWidth: '100%',
        mx: 'auto',
        border: '1px solid black',
        borderRadius: 'sm',
        boxShadow:2,
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
       
    },

    loginFooterBox : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    registerPageHeader : {
        height: '70vh', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
    },

    registerFormHeader : {
        my: 'auto',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        maxWidth: '100%',
        mx: 'auto',
        border: '1px solid black',
        borderRadius: 'sm',
        boxShadow:2,
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
      
    },

    registerFooter : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    modalBox : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}

export const cssStyles : {[key: string]: CSSProperties } = {

    header: { display: 'flex',alignItems: 'center',justifyContent: 'space-between', padding: '1px' },

    contentHeader : {  display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' },

    cardHeader : { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor:'#dcdcdc' },

    cardDescription : { flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'   },

    taskDescription : { maxHeight: '100px', overflow: 'auto', textAlign: 'center', padding:'2px' },

    cardFooter :{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'},

    modalHeader : { padding: '16px',  border: '2px solid black',borderRadius: '8px',backgroundColor: 'white', width: '300px' },

    modalFooter : { marginTop: '16px',display: 'flex', alignItems: 'center', justifyContent: 'space-between',padding:'4px' }

  };