import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import C from './style';

import {useStateValue} from '../../context/StateContext';
import api from '../../services/api';

export default() => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    navigation.setOptions({
        headerTitle: "Tela de Cadastro"
    });
  }, []);

  const cadastrarButton = async() => {
      if(name && email && cpf && password && passwordConfirm){
          let result = await api.register(name, email, cpf, password, passwordConfirm);
          if(result.error === '') {
              dispatch({type: 'setToken', payload: {token: result.token}});
              dispatch({type: 'setUser', payload: {user: result.user}});

               navigation.reset({
                  index: 1,
                  routes: [{name: 'ChoosePropertyScreen'}]
              });
          } else {
            alert(result.error);
          }
      }else {
        alert("Preencha os Campos");
      }
  }

  return (
    <C.Container>

      <C.Field
        placeholder="Digite seu Nome"
        value={name}
        onChangeText={t=>setName(t)}
      />

      <C.Field
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={t=>setCpf(t)}
      />

      <C.Field
        placeholder="Digite eu E-mail"
        value={email}
        onChangeText={t=>setEmail(t)}
      />

      <C.Field
        placeholder="Digite sua Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={t=>setPassword(t)}
      />

      <C.Field
        placeholder="Digite sua Senha Novamente"
        secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={t=>setPasswordConfirm(t)}
      />

      <C.ButtonArea onPress={cadastrarButton}>
        <C.ButtonText>CADASTRAR</C.ButtonText>
      </C.ButtonArea>

    </C.Container>
  );
}