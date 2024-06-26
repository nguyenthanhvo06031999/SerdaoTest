import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../components/Typography.tsx";

interface Props {
  data: Array<any>;

}

export const TransactionList = (props: Props) => {
  const { data } = props;

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <View>
        <Typography numberOfLines={1} style={styles.itemText}><Typography style={styles.bold}>ID:</Typography> {item.id}</Typography>
        <Typography numberOfLines={1} style={styles.itemText}><Typography style={styles.bold}>Amount:</Typography> ${item.amount.toFixed(2)}</Typography>
      </View>
      {item.account && (
        <View>
          <Typography numberOfLines={1} style={styles.itemText}><Typography style={styles.bold}>To:</Typography> {item.account.firstName} {item.account.lastName}</Typography>
          <Typography numberOfLines={1} style={styles.itemText}><Typography style={styles.bold}>IBAN:</Typography> {item.account.iban}</Typography>
        </View>
      )}
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography style={styles.title}>
          Transactions
        </Typography>
        <TouchableOpacity activeOpacity={0.8}>
          <Typography style={styles.seeAll}>See all</Typography>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#82fb9e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#313131',
  },
  seeAll: {
    color: '#82fb9e',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  }
});
