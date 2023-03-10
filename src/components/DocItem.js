import React from 'react';
import styled from 'styled-components/native';
import { Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import data from '../screens/WallScreen';

const Box = styled.TouchableOpacity`
  border-width: 2px;
  background-color: #FFF;
  border-color: #E8E9ED;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #000;
  margin-left: 10px;
`;


export default ({data}) => {

    const botaoClick = async () => {
      const suporte = await Linking.canOpenURL(data.fileurl);
      if(suporte){
        await Linking.openURL(data.fileurl);
      }
  }

  return (
    <Box onPress={botaoClick}>
      <Icon name="file-text" size={30} color="#993399" />
      <Title>{data.title}</Title>
    </Box>
  );
}