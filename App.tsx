import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/homeScreen";
import TransactionScreen from "./src/screens/transactionScreen";
import { TransactionProvider } from './src/contexts/TransactionContext.tsx';
import BeneficiaryScreen from "./src/screens/createBeneficiaryScreen";

export type RootStackParamList = {
  Home: undefined;
  Transaction: undefined;
  Beneficiary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const optionScreen = {
    headerShown: false
  }
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={optionScreen}  name="Home" component={HomeScreen} />
          <Stack.Screen options={optionScreen}  name="Transaction" component={TransactionScreen} />
          <Stack.Screen options={optionScreen}  name="Beneficiary" component={BeneficiaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;
