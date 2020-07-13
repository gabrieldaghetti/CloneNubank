import React from "react";
import { Container, Top, Logo, Title } from "./styles";
import logo from "../../assets/Nubank_Logo.png";
import Icon from "react-native-vector-icons/MaterialIcons";

function Header() {
  return (
    <Container>
      <Top>
        <Logo source={logo}></Logo>
        <Title>Gabriel</Title>
      </Top>
      <Icon name="keyboard-arrow-down" size={20} color="#fff" />
    </Container>
  );
}

export default Header;
