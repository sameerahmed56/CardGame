import React, { Component } from 'react'
import {View,Text,Animated, TouchableOpacity} from 'react-native'
import { color, measure } from 'react-native-reanimated'
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cardsList: [1,2,3,4,5,],
      startValue: new Animated.Value(20),
      endValueX: 0,
      [1 + "xValue"]: new Animated.Value(20),
      [2 + "xValue"]: new Animated.Value(20),
      [3 + "xValue"]: new Animated.Value(20),
      [4 + "xValue"]: new Animated.Value(20),
      [5 + "xValue"]: new Animated.Value(20),
      [1 + "yValue"]: new Animated.Value(0),
      [2 + "yValue"]: new Animated.Value(0),
      [3 + "yValue"]: new Animated.Value(0),
      [4 + "yValue"]: new Animated.Value(0),
      [5 + "yValue"]: new Animated.Value(0),
      duration: 1200,
    }
  }
  componentDidMount = () => {
    // let cardsList =  [1,2,3,4,5,6,7,8,9]
    // cardsList.forEach(element => {
    //   this.setState({[element]: new Animated.Value(20),})
    // });
  }
  moveBox = (item) =>{
    Animated.timing(this.state[item + "xValue"], {
      toValue: this.state.endValueX,
      duration: 700,
      useNativeDriver: true,
    }).start();  
    Animated.timing(this.state[item + "yValue"], {
      toValue: this.state.endValueY,
      duration: 700,
      useNativeDriver: true,
    }).start(); 
  }
  _measure = (item) => {
    let location = {}
    this.myComponent.measure((width, height, px, py, fx, fy) => {
      location = {
        fx: fx,
        fy: fy,
        px: px,
        py: py,
        width: width,
        height: height
      }
      console.log(location.fy)
      const myPromise = new Promise((resolve, reject) => {
        let endValueY = 0
        if(item>3){

          this.setState({endValueX: location.fx, endValueY:  -( ((item - 3) * 50) + 15)})
        }
        else if(item < 3){
          this.setState({endValueX: location.fx, endValueY: ((3 - item)  * 50) + 10})
        }
        else{
          this.setState({endValueX: location.fx, endValueY: 0})
        }
          resolve();
        });
        myPromise.then(()=>{
          this.moveBox(item)  
      })
    })
    
  }
  render() {
    return (
      <View style={{backgroundColor: '#C8A165',flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1/2, backgroundColor:  '#C8A165', justifyContent:'center'}}>
          {
            this.state.cardsList.map((item, index) => {
              return(
                <TouchableOpacity style={{marginVertical: 3}} onPress={()=>{
                  this._measure(item)
                }}>
                  <Animated.View
                    style={[
                      { backgroundColor: '#fff', height: 50, width: 80, borderRadius: 2, justifyContent: 'center', alignItems: 'center',
                        transform: [
                          {
                            translateX: this.state[item + "xValue"],
                          },
                          {
                            translateY: this.state[item + "yValue"],
                          },
                        ],
                      },
                    ]}
                  >
                    <Text style={{fontSize: 18}}>{item}</Text>
                  </Animated.View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={{flex: 2/3, backgroundColor: 'transparent'}}>
          <View style={{flex: 1/4 , backgroundColor: 'transparent'}}></View>
          <View style={{flex: 2/4 , backgroundColor: 'transparent', flexDirection: 'row'}}>
            <View style={{flex: 1/2, backgroundColor: 'transparent',justifyContent: 'center', }}>
              <View ref={view => { this.myComponent = view; }} style={{backgroundColor: 'transparent' ,height: 5, width: 5}}></View>
            </View>
            <View style={{flex: 1/2, backgroundColor: 'transparent'}}>
              <View style={{backgroundColor: 'transparent', flex: 1/2}}></View>
              <View style={{backgroundColor: 'transparent', flex: 1/2}}></View>
            </View>
          </View>
          <View style={{flex: 1/4 , backgroundColor: 'transparent'}}></View>
        </View>
      </View>
    )
  }
}

export default App