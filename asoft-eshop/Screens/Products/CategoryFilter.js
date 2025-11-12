// Screens/Products/CategoryFilter.js
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const CategoryFilter = ({
  categories = [],
  active = -1,
  categoryFilter,
}) => {
  return (
    <ScrollView
      horizontal
      bounces
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      <View style={styles.row}>
        {/* "All" badge (virtual category) */}
        <TouchableOpacity
          onPress={() => categoryFilter('all')}
          style={[
            styles.badge,
            active === -1 ? styles.badgeActive : styles.badgeInactive,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              active === -1 && styles.badgeTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {/* Real categories from JSON */}
        {categories.map((cat, index) => {
          const catId = cat._id ?? cat.id;
          const isActive = active === index;

          return (
            <TouchableOpacity
              key={catId ?? cat.name ?? index}
              onPress={() => categoryFilter(catId)}
              style={[
                styles.badge,
                isActive ? styles.badgeActive : styles.badgeInactive,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  isActive && styles.badgeTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#f2f2f2',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  badgeActive: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  badgeInactive: {
    backgroundColor: '#ffffff',
  },
  badgeText: {
    fontSize: 14,
    color: '#333',
  },
  badgeTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default CategoryFilter;
