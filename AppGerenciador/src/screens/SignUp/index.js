import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';


import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from "./styles";
import Api from '../../Api';

//SIGN-UP
export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if (nameField != '' && emailField != '' && passwordField != '') {
            const json = await Api.signUp(nameField, emailField, passwordField);

            if (json.token) {
                await AsyncStorage.setItem('token', json.token)

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes: [{ name: 'SignIn' }]
                });
            } else {
                alert("Erro: " + json.error);
            }
        } else {
            alert("Preencha todos os campos!");
        }
    };
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    };

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>

                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu Nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)}
                />

                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}

                />


                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick} >
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>

            </SignMessageButton>
        </Container>
    )
}