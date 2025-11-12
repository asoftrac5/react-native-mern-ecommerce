// // Screens/Products/ProductContainer.js
// import React, { useState, useEffect, useMemo } from 'react';
// import { View, StyleSheet, FlatList, Text } from 'react-native';
// import {
//   Box,
//   Input,
//   InputField,
//   InputSlot,
//   InputIcon,
// } from '@gluestack-ui/themed';
// import { SearchIcon } from 'lucide-react-native';

// import ProductList from './ProductList';
// import SearchedProduct from './SearchedProducts';
// const data = require('../../assets/data/products.json');

// const ProductContainer = () => {
//   const [products, setProducts] = useState([]);
//   const [query, setQuery] = useState('');
//   // Search product
//   const [productsFiltered, setProductsFiltered] = useState([]);
//   const [focus, setFocus] = useState();

//   useEffect(() => {
//     setProducts(data);
//     setProductsFiltered(data);
//     setFocus(false);

//     return () => {
//         setProducts([]);
//         setProductsFiltered([]);
//         setFocus();
//     }
//   }, []);

//   const filteredProducts = useMemo(
//     () =>
//       products.filter((p) =>
//         p.name.toLowerCase().includes(query.trim().toLowerCase())
//       ),
//     [products, query]
//   );

//   const renderItem = ({ item, index }) => (
//     <ProductList item={item} index={index} />
//   );

//   // Search Products
//   const searchProduct = (text) => {
//     setProductsFiltered(
//         products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
//     )
//   }

//   const openList = () => {
//     setFocus(true);
//   }

//   const onBlur =() => {
//     setFocus(false);
//   }

//   // IMPORTANT: this MUST be exactly like this
//   const keyExtractor = (item, index) =>
//     `${item.id ?? item._id ?? item.name ?? 'item'}-${index}`;

//   return (
//     <View style={styles.screen}>
//       {/* Search bar */}
//       <Box px="$4" mt="$4">
//         <Input variant="rounded" size="lg">
//           <InputSlot pl="$3">
//             <InputIcon as={SearchIcon} />
//           </InputSlot>
//           <InputField
//             placeholder="Search"
//             value={query}
//             // Search
//             onFocus={openList}
//             onChangeText= {(text) => searchProduct(text)}
//           />
//           { focus == true ? (
//             <Icon onPress={onBlur} name='ios-close' />
//           ) : null}
//         </Input>
//       </Box>

//       <Text style={styles.title}>Product Container</Text>

//       {focus == true? (
//         <SearchedProduct
//             productsFiltered={[productsFiltered]}
//         />
//       ) : (
//         <View style={styles.listContainer}>
//             <FlatList
//             data={filteredProducts}
//             numColumns={2}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//             />
//         </View>
//       )}

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: 'gainsboro',
//   },
//   title: {
//     marginTop: 16,
//     marginHorizontal: 16,
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   listContainer: {
//     flex: 1,
//     paddingTop: 16,
//     paddingHorizontal: 4,
//   },
// });

// export default ProductContainer;


// Screens/Products/ProductContainer.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Box,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Icon,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { SearchIcon, XIcon } from 'lucide-react-native';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';

const data = require('../../assets/data/products.json');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus(false);
    };
  }, []);

  // Filter products by name as the user types
  const searchProduct = (text) => {
    const query = text.trim().toLowerCase();

    if (!query) {
      // Empty query => reset to full list
      setProductsFiltered(products);
      return;
    }

    setProductsFiltered(
      products.filter((p) => p.name.toLowerCase().includes(query))
    );
  };

  const openList = () => setFocus(true);

  const onBlur = () => {
    setFocus(false);
    setProductsFiltered(products); // reset when closing search
  };

  const keyExtractor = (item, index) =>
    `${item.id ?? item._id ?? item.name ?? 'item'}-${index}`;

  const renderGridItem = ({ item, index }) => (
    <ProductList item={item} index={index} />
  );

  return (
    <View style={styles.screen}>
      {/* Search bar just under the header logo */}
      <Box px="$4" mt="$4">
        <Input variant="rounded" size="lg">
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>

          <InputField
            placeholder="Search"
            onFocus={openList}
            onChangeText={searchProduct}
          />

          {focus && (
            <InputSlot pr="$3">
              <Pressable onPress={onBlur}>
                <Icon as={XIcon} />
              </Pressable>
            </InputSlot>
          )}
        </Input>
      </Box>

      <Text style={styles.title}>Product Container</Text>

      {focus ? (
        // Search mode – show vertical list of matches
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        // Normal mode – show 2-column product grid
        <View style={styles.listContainer}>
          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderGridItem}
            keyExtractor={keyExtractor}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gainsboro',
  },
  title: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 4,
  },
});

export default ProductContainer;
