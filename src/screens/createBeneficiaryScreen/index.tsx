import React, { useState } from "react";
import { View, StyleSheet, TextInput, SafeAreaView, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../../components/Button.tsx";
import Typography from "../../components/Typography.tsx";
import { Header } from "../../components/Header.tsx";
import { isValid as isValidIBAN } from "iban";
import useBeneficiariesStore from "../../store/beneficiariesStore.ts";

interface BeneficiaryFormData {
  firstName: string;
  lastName: string;
  iban: string;
}

const BeneficiaryScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm<BeneficiaryFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      iban: ""
    }
  });
  const addBeneficiary = useBeneficiariesStore((state) => state.addBeneficiary);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = (data: BeneficiaryFormData) => {
    if (!isValidIBAN(data.iban)) {
      setError('iban', { type: 'manual', message: 'Invalid IBAN' });
      return;
    }
    addBeneficiary(data);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Header hasBackIcon hideRightButton title="Add Beneficiary" />
        <View style={{ flex: 1 }}>
          <View style={styles.inputView}>
            <Typography style={styles.title}>First name:</Typography>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "First name is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="First Name"
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
            {errors.iban && <Typography style={styles.errorText}>{errors.iban.message}</Typography>}
          </View>
        </View>
        <Button title="Create Beneficiary" onPress={handleSubmit(onSubmit)} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fafcff"
  },
  main: {
    flex: 1,
    backgroundColor: "#fafcff",
    paddingHorizontal: 24
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
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
  button: {
    marginTop: 16
  },
  inputView: {
    marginTop: 16
  },
  title: {
    fontWeight: "bold"
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

export default BeneficiaryScreen;
