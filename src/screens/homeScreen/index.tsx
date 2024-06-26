import React from 'react';
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTransactions } from "../../contexts/TransactionContext.tsx";
import { Header } from "../../components/Header.tsx";
import { useNavigation } from "@react-navigation/native";
import { Card } from "./Card.tsx";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App.tsx";
import { Button } from "../../components/Button.tsx";
import { TransactionList } from "./TransactionList.tsx";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type BeneficiaryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Beneficiary'
>;

const HomeScreen = () => {
  const { balance, transactions } = useTransactions();
  const navigation = useNavigation<HomeScreenNavigationProp | BeneficiaryScreenNavigationProp>();

  const goTransactionScreen = () => {
    navigation.navigate("Transaction")
  }

  const goCreateBeneficiaryScreen = () => {
    navigation.navigate("Beneficiary")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Header onPress={goCreateBeneficiaryScreen} title="Home" />
        <Card balance={balance} />
        <View style={{flex: 1}}>
          {
            transactions?.length > 0 && <TransactionList data={transactions} />
          }
        </View>
        <Button
          onPress={goTransactionScreen}
          title="Add Transaction"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafcff',
  },
  main: {
    flex: 1,
    backgroundColor: '#fafcff',
    paddingHorizontal: 24,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
