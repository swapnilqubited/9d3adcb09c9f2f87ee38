import React from 'react';
import {APIKEY} from '@env';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Spinner,
  Thumbnail,
  Button,
  Body,
} from 'native-base';
import styles from './styles';
import {Linking} from 'react-native';

const Asteroid = ({navigation, route}) => {
  const [id, setId] = React.useState(route.params.id);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const URL = 'https://api.nasa.gov/neo/rest/v1/neo/';
  const image_url =
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/andromeda-galaxy-royalty-free-image-1585682435.jpg?resize=480:*';

  const getData = () => {
    fetch(`${URL}${id}?api_key=${APIKEY}`)
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((e) => {
        setError(`Asteroid with id: ${id} does not exist`);
        setLoading(false);
      });
  };

  const getRandomAsteroid = () => {
    fetch(`${URL}browse?api_key=${APIKEY}`)
      .then((r) => r.json())
      .then((json) => {
        const list = json.near_earth_objects;
        const randomId = list[Math.floor(Math.random() * list.length)].id;
        setId(randomId);
      })
      .catch((e) => {
        console.log('Fetched: ', `${URL}${id}?api_key=${APIKEY}`);
        console.log('Error: ', e);
        setError(`Could not fetch random asteroid`);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (id) {
      getData();
    } else {
      getRandomAsteroid();
    }
  }, [id]);

  const openLink = React.useCallback(async () => {
      await Linking.openURL(data?.nasa_jpl_url);
  }, [data?.nasa_jpl_url]);

  return (
    <Container style={styles.rootView}>
      <Thumbnail source={{uri: image_url}} large style={styles.bg} />
      <Content>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Asteroid ID: {id}</Text>
          </CardItem>
          <CardItem bordered body>
            {loading ? (
              <Spinner />
            ) : error ? (
              <Text>{error}</Text>
            ) : (
              <Content>
                <Text>Name: {data.name}</Text>
                <Text>
                  NASA JPL URL:{' '}
                  <Text style={styles.link} onPress={openLink}>
                    {data.nasa_jpl_url}
                  </Text>
                </Text>
                <Text>
                  Is Hazardous:{' '}
                  {JSON.stringify(data.is_potentially_hazardous_asteroid)}
                </Text>
              </Content>
            )}
          </CardItem>
          <CardItem footer bordered>
            <Body>
              <Button
                style={styles.button}
                info
                onPress={() => navigation.goBack()}>
                <Text>Go Back</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Asteroid;
