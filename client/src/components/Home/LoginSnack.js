import React, { useEffect} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  const {t,i18n} = useTranslation();
  const handleClickVariant = (variant) => {
    enqueueSnackbar(t("Daily Login +5 points!!"), { variant });
  };
  
  let info = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
      if(info&&info.message==="first"){
          handleClickVariant("success");
          info={...info,message:"second"};
          localStorage.setItem('profile',JSON.stringify(info));
      }
  },[localStorage.getItem('profile')]);

  return (
    <div>
    </div>
  );
}


function loginSnack({info}) {
  return(
    <SnackbarProvider maxSnack={3}>
    <MyApp info={info}/>
  </SnackbarProvider>
  )
}

export default loginSnack;
