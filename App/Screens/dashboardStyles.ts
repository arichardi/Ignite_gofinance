import styled from 'styled-components/native'
import theme from '../config/styles/theme'

export const Container = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${ ({theme}) => theme.colors.background}
`;

export const Title = styled.Text`
    font-family: ${ ({theme}) => theme.fonts.regular};
    font-size: 24px;
    font-weight: bold;
    color: ${ ({theme}) => theme.colors.title};
`;