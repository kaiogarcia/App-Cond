import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
//import AsyncStorage from 'react-native-async-storage/async-storage';
import C from './style';

import {useStateValue} from '../../context/StateContext';
import api from '../../services/api';

import UnitPeopleSection from '../../components/UnitPeopleSection';

export default() => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [peopleList, setPeopleList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [petsList, setPetsList] = useState([]);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: `Dados da Unidade (${context.user.property.name})` 
    });
    getUnitInfo();
  }, []);

  const getUnitInfo = async () => {
    setLoading(true);
    const result = await api.getUnitInfo();
    setLoading(false);
    if(result.error === ''){
      setPeopleList(result.peoples);
      setVehicleList(result.vehicles);
      setPetsList(result.pets);
    } else {
      alert(result.error);
    }
  }

  return (
    <C.Container>
      <C.Scroller>
        {loading &&
          <C.LoadingIcon color="8B63E7" size="large" />
        }
        {!loading &&

            <>
            
            </>

        }
      </C.Scroller>
    </C.Container>
  );
}