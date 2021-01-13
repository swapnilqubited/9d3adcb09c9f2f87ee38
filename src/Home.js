import React from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Item,
  Input,
  Button,
  Thumbnail,
} from 'native-base';
import styles from './styles.js';
import {KeyboardAvoidingView} from 'react-native';

const Home = ({navigation}) => {
  const [id, setId] = React.useState('');
  const image_url =
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/andromeda-galaxy-royalty-free-image-1585682435.jpg?resize=480:*';

  return (
    <Container style={styles.rootView}>
      <Thumbnail source={{uri: image_url}} large style={styles.bg} />
      <Content>
        <KeyboardAvoidingView>
          <Card style={styles.card}>
            <CardItem header bordered>
              <Text>Asteroids</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Item>
                  <Input
                    value={id}
                    placeholder="Enter Asteroid ID"
                    onChangeText={setId}
                  />
                </Item>
                <Button
                  style={styles.button}
                  info
                  disabled={!id}
                  onPress={() => {
                    navigation.navigate('Asteroid', {id: id});
                    setId('');
                  }}>
                  <Text>Submit</Text>
                </Button>
                <Button
                  style={styles.button}
                  success
                  onPress={() => navigation.navigate('Asteroid', {id: null})}>
                  <Text>Random Asteroid</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </KeyboardAvoidingView>
      </Content>
    </Container>
  );
};

export default Home;
