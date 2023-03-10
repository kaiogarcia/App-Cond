import React, { useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import C from './style';

//console.log("AppLoading:", AppLoading);
//console.log("AuthContext.Provider:", AuthContext.Provider);

import { useStateValue } from '../../context/StateContext';
import api from '../../services/api';

export default() => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const checkPropertySel = async () => {
        let property = await AsyncStorage.getItem('property');
        if(property) {
            property = JSON.parse(property);
            await checkProperty(property);
        }
        setLoading(false);
    }
    checkPropertySel();
  }, []);

    const LogoutButton = async () => {
      await api.logout();
      navigation.reset({
            index: 1,
            routes:[{name: 'LoginScreen'}]
      });
  }

  const chooseProperty = async (property) => {
      await AsyncStorage.setItem('property', JSON.stringify(property));
      dispatch({
        type: 'setProperty',
        payload: {
          property
        }
      });

      navigation.reset({
        index: 1,
        routes:[{name:'MainDrawer'}]
      });
  } 

  return (
    <C.Container> 
              <C.Scroller>
        {loading &&
            <C.LoadingIcon color="#8863E6" size="large"/>
        }
        {!loading && context.user.user.properties.length > 0 &&
          <>
              <C.HeadTitle> Ola {context.user.user.name} </C.HeadTitle>
              <C.HeadTitle>Escolha uma das suas propriedades</C.HeadTitle>

              <C.PropertyList>
                {context.user.user.properties.map((item, index) => (
                  <C.ButtonArea key={index} onPress={()=>chooseProperty(item)}>
                      <C.ButtonText>{item.name} </C.ButtonText>

                  </C.ButtonArea>

                ))}
              </C.PropertyList>
          </>
        }
        {!loading && context.user.user.properties.length <= 0 &&
              <C.BigArea>
                 <C.HeadTitle>{context.user.user.name}, parabens pelo seu cadastro!</C.HeadTitle>
                  <C.HeadTitle>Aguarde! A administracao ira liberar seu cadastro.
                  </C.HeadTitle>
              </C.BigArea>
        }
      </C.Scroller>
      <C.ExitButtonArea onPress={LogoutButton}>
        <C.ExitButtonText> Sair </C.ExitButtonText>
      </C.ExitButtonArea>      
    </C.Container>
  );
}