import React from 'react';
import Config from '../../Config';
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';



class List2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],

        }

    }

    componentDidMount() {
      console.log('>> List2#componentDidMount');
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${Config.API_KEY}&page=1&limit=20`;
      console.log('url', url);
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log('List2#top_rated#componentDidMount data', data);

          this.setState({
            isLoading: false,
            dataSource: data.results
          })

          .catch((error) => {
            console.error(error);
        });
        console.log('<< List2#componentDidMount');
      });

    }


    render() {

      const { navigate } = this.props.navigation;
      const {dataSource} = this.state;

      if(this.state.isLoading) {
        return (
          <View style={Styles.container}>
  
            <ActivityIndicator/> 
  
          </View>
        );
  
      } else {
  
        return (
  
          <View style={Styles.container}>
  
            <Text style={Styles.texte}>Tendances actuelles</Text>
  
            <View style={Styles.row}>
     
              <FlatList
                ItemSeparatorComponent={() => (
                  <View style={{width:10}}/>
                )}
                horizontal
                style={{zIndex: 10}}
                keyExtractor={dataSource.id}
                data={dataSource}
                renderItem={({item, separators}) => (
                  <View>
                    <TouchableOpacity  onPress={() => {
                     navigate('DetailsMovie', {...item}) 
                     }}>
                      <Image 
                        style={{width:120, height: 180}}
                        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
                      />  
                    </TouchableOpacity>
                  </View>
                )}/>
        
                
            </View>
  
          </View>
        )
      }
    }
  }
export default withNavigation(List2);

const Styles = StyleSheet.create({
  container: {
    flex: 1 ,
    position: "relative",
    top: -18,
    left: 0,
  },
  row: {
    justifyContent: "center",
    alignItems: 'center',
  },
  texte: {
    textAlign: "left",
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fafafa",
  }

});