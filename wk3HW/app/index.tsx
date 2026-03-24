import { StyleSheet, Text, View, FlatList, Image, Pressable, ScrollView } from "react-native";
import { Link } from 'expo-router';
import books from './books.json';

const icon_search = require('./assets/icons/topnav/icon_search.png');
const icon_menu = require('./assets/icons/topnav/icon_menu.png');

const icon_star_filled = require('./assets/icons/star/icon_star_filled.png');
const icon_star_empty = require('./assets/icons/star/icon_star_empty.png');

const icon_home_actived = require('./assets/icons/bttab/icon_home_actived.png');
const icon_nav_bookmark = require('./assets/icons/bttab/icon_nav_bookmark.png');
const icon_mybook = require('./assets/icons/bttab/icon_mybook.png');

const imgmap = {
  book1: require('./assets/bookimg/img_book_fashinopolis.png'),
  book2: require('./assets/bookimg/img_book_chanel.png'),
  book3: require('./assets/bookimg/img_book_calligraphy.png'),
  book4: require('./assets/bookimg/img_book_ysl.png'),
  book5: require('./assets/bookimg/img_book_tbos.png'),
  book6: require('./assets/bookimg/img_book_stitchedup.png'),
}
const popularBooks = books.filter(b => b.id.startsWith('p'));
const newestBooks = books.filter(b => b.id.startsWith('n'));

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Pressable //選單按鈕
          style={({ pressed }) => (
            { opacity: pressed ? 0.6 : 1 }
          )}
        >
          <Image
            source={icon_menu}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable //搜尋按鈕
          style={({ pressed }) => (
            { opacity: pressed ? 0.6 : 1 }
          )}
        >
          <Image
            source={icon_search}
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

        <Text style={styles.title}>Popular Books</Text>
        <FlatList //popular 列表
          horizontal={true}
          data={popularBooks}
          renderItem={({ item }) => (
            <Link href={`/${item.id}`} asChild>
              <Pressable style={styles.bookCard}>
                <Image source={imgmap[item.img]} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.title}>Newest</Text>
        <FlatList //newest 列表
          horizontal={true}
          data={newestBooks}
          renderItem={({ item }) => (
            <Link href={`/${item.id}`} asChild>
              <Pressable style={styles.bookCard}>
                <Image source={imgmap[item.img]} style={styles.bookImage} />
                <View style={styles.stars}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image //星星
                      key={index}
                      source={index < item.stars ? icon_star_filled : icon_star_empty}
                      style={styles.star}
                    />
                  ))}
                </View>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>

              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />

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
    </View >

  );
}

/*style*/
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
    paddingBottom: 158,
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 16,
    marginLeft: 20,
  },
  bookCard: {
    marginRight: 16,
    width: 140,
    marginBottom: 16,
  },
  bookImage: {
    width: 140,
    height: 200,
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666666'
  },
  list: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 14,
    height: 14,
    marginRight: 4,
    marginBottom: 8,
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
