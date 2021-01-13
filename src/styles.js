import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  rootView: {
    backgroundColor: 'black',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '30%',
  },
  bg: {
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  button: {
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  link: {
    fontSize: 14,
    color: '#4444ff',
    textDecorationLine: 'underline',
  },
});

export default styles;
