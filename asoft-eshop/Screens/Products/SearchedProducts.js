// import React from "react";
// import {View, StyleSheet, Dimensions } from 'react-native';
// import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

// var { width } = Dimensions.get('window');

// const SearchedProduct = (props) => {
//     const { productsFiltered } = props;
//     return (
//         <Content style={{ width }}>
//             {productsFiltered.length > 0 ? (
//                 productsFiltered.map((item) => (
//                     <ListItem 
//                         // onPress={navigation}
//                         key={item._id.$oid}
//                         avatar
//                     >
//                         <Left>
//                             <Thumbnail
//                                 source={{uri: item.image ? 
//                                     item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' 
//                                 }}
//                             />
//                         </Left>
//                         <Body>
//                             <Text>{item.name}</Text>
//                             <Text note>{item.description}</Text>
//                         </Body>
//                     </ListItem>
//                 ))
//             ) : (
//                 <View styles={StyleSheet.center}>
//                     <Text style={{ alignS: 'center' }}>
//                         No products match the selected criteria
//                     </Text>
//                 </View>
//             )}
//         </Content>
//     )
// }

// const styles = StyleSheet.create ({
//     center: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })

// export default SearchedProduct;


// Screens/Products/SearchedProducts.js
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  ScrollView,
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Pressable,
} from '@gluestack-ui/themed';

const { width } = Dimensions.get('window');

const FALLBACK_IMAGE =
  'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png';

const SearchedProduct = ({ productsFiltered = [], onSelect }) => {
  return (
    <ScrollView style={{ width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item, index) => (
          <Pressable
            key={item.id ?? item._id ?? item.name ?? index}
            onPress={() => onSelect?.(item)}
          >
            <HStack px="$4" py="$3" space="md" alignItems="center">
              <Image
                source={{
                  uri: item.image || FALLBACK_IMAGE,
                }}
                alt={item.name}
                w="$12"
                h="$12"
                borderRadius="$full"
              />
              <VStack flex={1}>
                <Text fontWeight="$medium">{item.name}</Text>
                {item.description ? (
                  <Text size="xs" color="$muted.500" numberOfLines={2}>
                    {item.description}
                  </Text>
                ) : null}
              </VStack>
            </HStack>
          </Pressable>
        ))
      ) : (
        <Box style={styles.center}>
          <Text>No products match the selected criteria</Text>
        </Box>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    width: '100%',
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchedProduct;
