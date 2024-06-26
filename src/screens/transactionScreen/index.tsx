import React, { useState } from "react";
import { View, TextInput, SafeAreaView, StyleSheet, Modal } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useTransactions } from "../../contexts/TransactionContext.tsx";
import { Header } from "../../components/Header.tsx";
import { useForm, Controller } from 'react-hook-form';
import Typography from "../../components/Typography.tsx";
import { Button } from "../../components/Button.tsx";
import useBeneficiariesStore from "../../store/beneficiariesStore.ts";
import { isValid as isValidIBAN } from "iban";

interface TransactionData {
  firstName: string;
  lastName: string;
  iban: string;
  amount: string;
}
interface AccountDetails {
  firstName: string;
  lastName: string;
  iban: string;
}

interface Beneficiary {
  firstName: string;
  lastName: string;
  iban: string;
}

const TransactionScreen = () => {
  const { balance } = useTransactions();
  const { control, handleSubmit, setValue, formState: { errors }, setError, reset } = useForm({defaultValues: {
      firstName: "",
      lastName: "",
      iban: "",
      amount: "",
    }});
  const { addTransaction } = useTransactions();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mode, setMode] = useState("manual");
  const [showPopup, setShowPopup] = useState(false);
  const [selectUser, seSelectUser] = useState<Beneficiary | undefined >();
  const beneficiaries = useBeneficiariesStore((state) => state.beneficiaries);

  const handleTransaction = (data: TransactionData) => {
    if (!isValidIBAN(data.iban) && mode !== 'select') {
      setError('iban', { type: 'manual', message: 'Invalid IBAN' });
      return;
    }
    const transactionAmount = parseInt(data.amount, 10);

    if (transactionAmount > balance) {
      setError('amount', { type: 'manual', message: 'Amount exceeds available balance' });
      return;
    }
    const accountDetails: AccountDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      iban: data.iban
    };
    addTransaction(transactionAmount, accountDetails);
    setShowPopup(true);
  };

  const handleUserSelect = (userId: number) => {
    const user = beneficiaries.find(u => u.id == userId);
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("iban", user.iban);
    }
    seSelectUser(user);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Header title="Add Transaction" hasBackIcon hideRightButton />
        <View style={{ flex: 1 }}>
          <View style={styles.toggleContainer}>
            <Button style={{ backgroundColor: mode !== 'select' ? "#888" : "#82fb9e" }} title="Select User" onPress={() => setMode("select")} />
            <Button style={{ backgroundColor: mode !== 'manual' ? "#888" : "#82fb9e" }} title="Add Manual" onPress={() => setMode("manual")} />
          </View>

          {mode === "select" ? (
            <View>
              <View style={styles.inputView}>
                <Typography style={styles.title}>Amount:</Typography>
                <Controller
                  control={control}
                  name="amount"
                  rules={{ required: true, pattern: /^\d+(\.\d{1,2})?$/ }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Amount"
                      placeholderTextColor="#ccc"
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedField("amount")}
                      onBlur={() => setFocusedField(null)}
                      style={[
                        styles.input,
                        errors.amount ? styles.errorInput : null,
                        focusedField === "amount" ? styles.focusedInput : null
                      ]}
                    />
                  )}
                />
                {errors.amount && <Typography style={{ color: 'red' }}>Amount is required and must be a number</Typography>}
              </View>
              <View style={styles.inputView}>
                <Typography style={styles.title}>User:</Typography>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  onValueChange={(value) => handleUserSelect(value)}
                  items={beneficiaries.map(user => ({ label: `${user.firstName} ${user.lastName}`, value: user.id }))}
                  placeholder={{ label: "Select a user", value: null }}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.inputView}>
                <Typography style={styles.title}>Amount:</Typography>
                <Controller
                  control={control}
                  name="amount"
                  rules={{ required: true, pattern: /^\d+(\.\d{1,2})?$/ }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Amount"
                      placeholderTextColor="#ccc"
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedField("amount")}
                      onBlur={() => setFocusedField(null)}
                      style={[
                        styles.input,
                        errors.amount ? styles.errorInput : null,
                        focusedField === "amount" ? styles.focusedInput : null
                      ]}
                    />
                  )}
                />
                {errors.amount && <Typography style={{ color: 'red' }}>Amount is required and must be a number</Typography>}
              </View>
              <View style={styles.inputView}>
                <Typography style={styles.title}>First name:</Typography>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{ required: "First name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="#ccc"
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                      style={[
                        styles.input,
                        errors.firstName ? styles.errorInput : null,
                        focusedField === "firstName" ? styles.focusedInput : null
                      ]}
                    />
                  )}
                />
                {errors.firstName && <Typography style={styles.errorText}>{errors.firstName.message}</Typography>}
              </View>
              <View style={styles.inputView}>
                <Typography style={styles.title}>Last name:</Typography>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: "Last name is required" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="#ccc"
                      value={value}
                      onChangeText={onChange}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                      style={[
                        styles.input,
                        errors.lastName ? styles.errorInput : null,
                        focusedField === "lastName" ? styles.focusedInput : null
                      ]}
                    />
                  )}
                />
                {errors.lastName && <Typography style={styles.errorText}>{errors.lastName.message}</Typography>}
              </View>
              <View style={styles.inputView}>
                <Typography style={styles.title}>IBAN:</Typography>
                <Controller
                  control={control}
                  name="iban"
                  rules={{ required: "IBAN is required" }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="IBAN"
                      placeholderTextColor="#ccc"
                      value={value}
                      onChangeText={(value) => {
                        onChange(value);
                        if (errors.iban) setError("iban", { type: "manual", message: "" });
                      }}
                      onFocus={() => setFocusedField("iban")}
                      onBlur={() => setFocusedField(null)}
                      style={[
                        styles.input,
                        errors.iban ? styles.errorInput : null,
                        focusedField === "iban" ? styles.focusedInput : null
                      ]}
                    />
                  )}
                />
                {errors.iban && <Typography style={styles.errorText}>{errors?.iban?.message}</Typography>}
              </View>
            </>
          )}
        </View>
        <Button disabled={mode === 'select' && !selectUser} title="Submit Transaction" onPress={handleSubmit(handleTransaction)} />

        <Modal
          visible={showPopup}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
              <Typography>Beneficiary added successfully!</Typography>
              <Button style={styles.closeButton} title="OK" onPress={handlePopupClose} />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#313131',
    paddingRight: 30,
    backgroundColor: '#fafcff',
    marginTop: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#313131',
    paddingRight: 30,
    backgroundColor: '#fafcff',
    marginTop: 16,
  },
  placeholder: {
    color: '#a9a9a9',
    fontSize: 16,
  },
});

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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  errorInput: {
    borderColor: "#ff0000",
    borderWidth: 1
  },
  focusedInput: {
    borderColor: "#82fb9e"
  },
  errorText: {
    color: "#ff0000",
  },
  inputView: {
    marginTop: 16
  },
  title: {
    fontWeight: "bold"
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    width: '100%',
    marginTop: 24,
  }
});

export default TransactionScreen;
