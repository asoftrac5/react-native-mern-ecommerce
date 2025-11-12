
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
        productsFiltered.map((item) => (
          <Pressable
            key={String(item.id ?? item._id ?? item.name)}
            onPress={() => onSelect?.(item)}
          >
            <HStack px="$4" py="$3" space="md" alignItems="center">
              <Image
                source={{ uri: item.image || FALLBACK_IMAGE }}
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
