import React from 'react';
import { View, StyleSheet } from "react-native";
import Typography from "../../components/Typography.tsx";

interface Props {
  balance: number;
}

const SERIES_NUMBER = "2399194278329999";
const HIDE_NUMBER = "XXXX"

export const Card = (props: Props) => {
  const { balance } = props;
  const draftSeriesNumbers: string[] | null = SERIES_NUMBER.match(/.{1,4}/g);
  const newSeriesNumber: (string | "-")[] = [];
  if (draftSeriesNumbers) {
    draftSeriesNumbers.forEach((series, index) => {
      if(index === 1 || index === 2) {
        newSeriesNumber.push(HIDE_NUMBER);
      } else {
        newSeriesNumber.push(series);
      }
      if (index < draftSeriesNumbers.length - 1) {
        newSeriesNumber.push("-");
      }
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.headerCard}>
          <View style={styles.dollarIcon}>
            <Typography style={styles.dollarText}>$</Typography>
          </View>
          <View style={styles.balanceView}>
            <Typography style={styles.balance}>${balance.toFixed(2)}</Typography>
            <Typography style={styles.description}>Current Balance</Typography>
          </View>
        </View>
      </View>
      <View style={styles.info}>
        <Typography style={styles.description}>Series Number:</Typography>
        <View style={styles.seriesNumber}>
          {newSeriesNumber.map((item, index) => {
            return <Typography key={index} style={styles.balance}>{item}</Typography>;
          })}
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#82fb9e',
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#313131',
  },
  button: {
    backgroundColor: '#82fb9e',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  titleButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  dollarText: {
    color: '#82fb9e',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dollarIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fafcff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#313131',
  },
  description: {
    color: '#313131',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  balanceView: {
    marginLeft: 8
  },
  info: {
    marginTop: 8,
  },
  seriesNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  }
});
