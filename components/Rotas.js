import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import CadastrarCriptos from './AlterarCriptos';
import AlterarCriptos from './CadastrarCriptos';



const Stack = createStackNavigator();

export default function Rotas() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}  />
            <Stack.Screen name="Cadastrar" component={CadastrarCriptos}  />
            <Stack.Screen name="Alterar" component={AlterarCriptos}  />
        </Stack.Navigator>
    );
}



