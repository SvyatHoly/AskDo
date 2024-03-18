import React, { useState } from 'react'
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { TextStyles, rem, Colors, Button, ButtonColor } from 'design-system'
import { v4 as uuidv4 } from 'uuid'
import { CloseIcon } from 'shared/icons/CloseIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'shared/TextInput'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Coordinate, Location } from 'Profile/types'
import { getAddressFromCoordinates } from 'utils/api'

interface Props {
  location?: Location
  onClose: () => void
  onSave: (value: Location) => void
}
export const LocationModal: React.FC<Props> = ({ location, onClose, onSave }) => {
  const [region, setRegion] = useState({
    latitude: location?.coordinate.latitude ?? 41.391476,
    longitude: location?.coordinate.longitude ?? 2.185535,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [value, setValue] = useState(location?.address ?? '')
  const [coordinate, setCoordinate] = useState(location?.coordinate ?? { latitude: 41.391476, longitude: 2.185535 })

  const handleMarkerDrag = (event: React.BaseSyntheticEvent<{ coordinate: Coordinate }>) => {
    setCoordinate(coordinate)
    getAddressFromCoordinates(event.nativeEvent.coordinate).then((value) => setValue(String(value)))
  }

  const handleSave = () => {
    let obj: Location = { id: location?.id ?? uuidv4(), address: value, coordinate: coordinate }
    onSave(obj)
  }
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <>
          <Page insets={insets}>
            <Header>
              <Balancer />
              <TextStyles.BodyL>Select a point</TextStyles.BodyL>
              <CloseButton onPress={onClose}>
                <CloseIcon />
              </CloseButton>
            </Header>
            <Separator />
            <MapContainer>
              <StyledMapView region={region}>
                <Marker draggable={true} key={0} coordinate={coordinate} onDragEnd={handleMarkerDrag} />
              </StyledMapView>
            </MapContainer>
            <InputContainer>
              <StyledTextInput
                placeholder={'Enter the address'}
                isValid={true}
                editable={true}
                value={value}
                onChangeText={setValue}
              />
            </InputContainer>
            <ButtonContainer insets={insets}>
              <Button color={ButtonColor.GREY} onPress={handleSave}>
                <ButtonText>Save</ButtonText>
              </Button>
            </ButtonContainer>
          </Page>
        </>
      )}
    </SafeAreaInsetsContext.Consumer>
  )
}

const ButtonText = styled(TextStyles.BodyM)`
  color: ${Colors.white};
`

const ButtonContainer = styled.View<{ insets: EdgeInsets | undefined }>`
  padding: ${rem(20)}px;
  margin-bottom: ${(props) => (props.insets?.bottom ? props.insets?.bottom + 87 : 87)}px;
  width: 100%;
  flex: 1;
  border-radius: ${rem(15)}px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`

const StyledTextInput = styled(TextInput)`
  flex: 1;
`
const Balancer = styled.View`
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const InputContainer = styled.View`
  flex-direction: row;
  padding-top: ${rem(15)}px;
  padding-bottom: ${rem(15)}px;
  border-radius: ${rem(15)}px;
  background-color: ${Colors.grayForInput};
  margin: ${rem(12)}px;
  justify-content: flex-start;
`

const CloseButton = styled(TouchableOpacity).attrs({
  hitSlop: { top: rem(12), right: rem(12), bottom: rem(12), left: rem(12) },
})`
  align-items: center;
  justify-content: center;
  width: ${rem(30)}px;
  height: ${rem(30)}px;
`

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.graySuperLight};
`
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${rem(12)}px;
`

const Page = styled.View<{ insets: EdgeInsets | null }>`
  flex-direction: column;
  padding-top: ${(props) => props.insets?.top ?? 0}px;
  height: 100%;
  width: 100%;
  background-color: white;
`
const MapContainer = styled.View`
  flex: 10;
  width: 100%;

  overflow: hidden;
`
const StyledMapView = styled(MapView)`
  height: 100%;

  width: 100%;
`
