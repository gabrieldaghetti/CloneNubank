import React from "react";
import { Animated, StatusBar } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation,
} from "./styles";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Menu from "./components/Menu";

function App() {
  const translateY = new Animated.Value(0);
  let offset = 0;
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;
      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#8b10ae" />
      <Container>
        <Header />
        <Content>
          <Menu translateY={translateY} />
          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <Card
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [-350, 0, 380],
                      outputRange: [-50, 0, 380],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            >
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666" />
                <Icon name="visibility-off" size={28} color="#666" />
              </CardHeader>
              <CardContent>
                <Title>Saldo Disponivel</Title>
                <Description>R$ 100.000,00</Description>
              </CardContent>
              <CardFooter>
                <Annotation>
                  Transferecia de R$ 20,00 recebida de Gabriel
                </Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>
        <Tabs translateY={translateY} />
      </Container>
    </>
  );
}

export default App;
