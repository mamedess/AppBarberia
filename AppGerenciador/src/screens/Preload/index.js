import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text } from "react-native";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg'


export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(() => {
        const checarToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token){
               let json = await Api.checkToken(token);
               if(json.token){
                   
                await AsyncStorage.setItem('token', json.token)

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                });
               } else {
                navigation.navigate('SignIn');
               }
            }
            else {
                navigation.navigate('SignIn');
            }
        }
        checarToken();

    });
    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon animating={true} size="large" color="#FFFFFF" />
        </Container>
    );
}