import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

const book4 = require('./assets/bookimg/img_book_ysl.png');

const icon_back = require('./assets/icons/topnav/icon_back.png');
const icon_bookmark = require('./assets/icons/topnav/icon_bookmark.png');
const icon_bookmark_actived = require('./assets/icons/topnav/icon_bookmark_actived.png');

const icon_star_filled = require('./assets/icons/star/icon_star_filled.png');
const icon_star_empty = require('./assets/icons/star/icon_star_empty.png');

const icon_home_actived = require('./assets/icons/bttab/icon_home_actived.png');
const icon_nav_bookmark = require('./assets/icons/bttab/icon_nav_bookmark.png');
const icon_mybook = require('./assets/icons/bttab/icon_mybook.png');

const currentBookData = {
  id: 'n1',
  title: 'Yves Saint Laurent',
  author: 'Suzy Menkes',
  img: book4,
  stars: 4,
  price: '$46.99',
  description: 'A spectacular visual journey through 40 years of haute couture from one of the best-known and most trend-setting brands in fashion.',
};

export default function BookDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable style={({ pressed }) => (
            { opacity: pressed ? 0.6 : 1 }
          )}
          onPress={() => router.replace('/')}
          >
          <Image source={icon_back} style={styles.icon} />
        </Pressable>
        <Pressable onPress={() => setIsBookmarked(!isBookmarked)}>
          <Image
            source={isBookmarked ? icon_bookmark_actived : icon_bookmark}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={currentBookData.img} style={styles.bookImage} />
        <View style={styles.infoBlock}>
          <Text style={styles.bookTitle}>{currentBookData.title}</Text>
          <Text style={styles.bookAuthor}>{currentBookData.author}</Text>

          <View style={styles.score} //星星+分數
          >
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  source={index < currentBookData.stars ? icon_star_filled : icon_star_empty}
                  style={styles.star}
                />
              ))}
            </View>
            <Text style={styles.scoreText}>
              <Text style={{ color: '#000000' }}> {currentBookData.stars}.0</Text> / 5.0
            </Text>
          </View>
        </View>

        <View style={styles.bodyContent}>
          <Text style={styles.descriptionText}>{currentBookData.description}</Text>

          <View style={{ alignItems: 'center' }}>
            <Pressable style={styles.buyButton}>
              <Text style={styles.buyButtonText}>BUY NOW FOR {currentBookData.price}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.tabBar}>

        <Pressable //Home按鈕
          style={styles.bttab}
        >
          <Image
            source={icon_home_actived}
            style={styles.tabicon}
            resizeMode="contain"
          />
          <Text style={styles.tabTextActive}>Home</Text>
        </Pressable>

        <Pressable //Wishlist按鈕
          style={styles.bttab}
        >
          <Image
            source={icon_nav_bookmark}
            style={styles.tabicon}
            resizeMode="contain"
          />
          <Text style={styles.tabText}>Wishlist</Text>
        </Pressable>

        <Pressable //My Books按鈕
          style={styles.bttab}
        >
          <Image
            source={icon_mybook}
            style={styles.tabicon}
            resizeMode="contain"
          />
          <Text style={styles.tabText}>My books</Text>
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    alignItems: 'center',
    height: 56,
  },
  icon: {
    width: 24,
    height: 24,
    margin: 8,
  },
  body: {
    marginTop: 8,
  },
  scrollContent: {
    paddingBottom: 280,
    alignItems: 'center',
  },
  bookImage: {
    width: 210,
    height: 300,
  },
  infoBlock: {
    alignItems: 'center',
    marginTop: 28,
    paddingHorizontal: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  scoreText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666666',
    fontWeight: 400,
  },
  bodyContent: {
    marginTop: 16,
    paddingHorizontal: 50,
    width: '100%',
  },
  descriptionText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 22, 
    textAlign: 'center',
    marginBottom: 28,
  },
  buyButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: 14,
    marginHorizontal: 16,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 10,
    marginBottom: 48,
  },
  bttab: {
    flex: 1,
    alignItems: 'center',
    width: 'auto',
  },
  tabicon: {
    width: 24,
    height: 24,
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
  },
  tabTextActive: {
    fontSize: 12,
    color: '#6200EE',
    fontWeight: 'bold',
    marginTop: 4,
  },
});