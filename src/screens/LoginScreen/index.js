import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import C from './style';

import {useStateValue} from '../../context/StateContext.js';
import api from '../../services/api';

export default() => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
    
  const entrarButton = async () => {
      if(cpf && password){
          let result = await api.login(cpf, password);
  
          if(result.error === '') {
              dispatch({type: 'setToken', payload: {token: result.token}});
              dispatch({type: 'setUser', payload: {user: result.user}});


            /*const resetAction = StackActions.reset({
              index: 1,
              //actions: [NavigationActions.navigate({ routeName: 'ChoosePropertyScreen' })],
                  actions: [StackActions.push({routeName: 'ChoosePropertyScreen'})]
              });*/
                /*const pushAction = StackActions.push({
                    routeName: 'ChoosePropertyScreen'
              })*/
              //this.props.navigation.dispatch(resetAction);
                  //this.props.navigation.dispatch(pushAction);
              
               navigation.reset({
                  index: 1,
                  routes: [{name: 'ChoosePropertyScreen'}]
              });

              /*const resetAction = NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'ChoosePropertyScreen' })
              ],
            });
              this.props.navigation.dispatch(resetAction);*/


          } else {
            alert(result.error);
          }

      } else {
        alert("Preencha os campos");
      }
  }

  const cadastrarButton = () => {
    navigation.navigate('RegisterScreen');
  }

  return (
    <C.Container>
      <C.Logo
        source={require('../../assets/undraw_home.png')}
        resizeMode="contain"
      />

      <C.Field
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={t=>setCpf(t)}
      />

      <C.Field
        placeholder="Digite sua Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={t=>setPassword(t)}
      />

      <C.ButtonArea onPress={entrarButton}>
        <C.ButtonText>ENTRAR</C.ButtonText>
      </C.ButtonArea>

      <C.ButtonArea onPress={cadastrarButton}>
        <C.ButtonText>CADASTRAR</C.ButtonText>
      </C.ButtonArea>

    </C.Container>
  );
}