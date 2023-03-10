import styled from 'styled-components/native';

export default {

    Container: styled.SafeAreaView`
        flex: 1;
        padding: 20px;
        background-color: #F5F6FA;
  `,
  
  Logo: styled.Image `
        width: 400px;
        height: 200px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
        justifyContent: center;
  `,
  Field: styled.TextInput `
        border-width: 1px;
        border-color: #CCC;
        background-color: #cdcdcd;
        border-radius: 5px;
        color: #000;
        font-size: 15px;
        padding: 10px;
        margin-bottom: 15px;
  `,
  ButtonArea: styled.TouchableOpacity `
        background-color: #8863E6;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 15px;
  `,
  ButtonText: styled.Text `
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
  `

};