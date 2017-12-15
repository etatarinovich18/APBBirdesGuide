import React  from 'react';
import Swiper from 'react-native-swiper';
import { APBImage } from "../common/APBImage";
import { View } from "react-native";
import Dots from "./Dots";

const SingleBirdImageSlider = ({ gallery, birdId }) => {

  return (
    <View style={{ position: 'relative' }}>
      <Swiper showsButtons={false}
              height={235}
              renderPagination={(index, total) => {
                return (
                  <View style={styles.paginationWrapper}>
                    <View style={styles.paginationOpacity} />
                    <Dots total={total} index={index} />
                  </View>
                )
              }}>
        { gallery.map((imageName, idx) => {
          return (
            <APBImage key={idx}
                      source={`assets/galleries/${birdId}/${imageName}`}
                      height={275}
                      width="100%"
                      resizeMode="cover" />
          )
        })
        }
      </Swiper>
    </View>
  )
}

const styles = {
  paginationWrapper: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    width: '100%'
  },
  paginationOpacity: {
    opacity: 0.35,
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 40
  }
}

export default SingleBirdImageSlider;