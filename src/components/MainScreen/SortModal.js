import React from 'react';
import { View, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import { RadioButton } from '../common/RadioButton';

const SortModal = ({ visible, close, sort, setSortField, filterBirds, resetSortFields, search }) => {

  const {
    modalOverlayStyle,
    modalContainerStyle,
    modalTitleStyle,
    radioGroupStyle,
    radioGroupTitleStyle,
    modalFooter,
    modalFooterTextStyle
  } = styles;

  const { lang, size} = sort;

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={modalOverlayStyle}>
        <ScrollView>
          <View style={modalContainerStyle}>
            <View>
              <Text style={modalTitleStyle}>Сортировать по:</Text>
            </View>

            <View style={radioGroupStyle}>
              <Text style={radioGroupTitleStyle}>Языку имени</Text>

              <RadioButton
                label="Русский"
                field="lang"
                value="name_rus"
                setSortField={setSortField}
                marked={lang === 'name_rus'}
              />

              <RadioButton
                label="Латинский"
                field="lang"
                value="title-lat"
                setSortField={setSortField}
                marked={lang === 'title-lat'}
              />

              <RadioButton
                label="Белорусский"
                field="lang"
                value="title-bel"
                setSortField={setSortField}
                marked={lang === 'title-bel'}
              />

            </View>

            <View style={radioGroupStyle}>
              <Text style={radioGroupTitleStyle}>Начинать с размера</Text>

              <RadioButton
                label="Маленького"
                field="size"
                value="asc"
                setSortField={setSortField}
                marked={size === 'asc'}
              />

              <RadioButton
                label="Большого"
                field="size"
                value="desc"
                setSortField={setSortField}
                marked={size === 'desc'}
              />

            </View>
          </View>
          <View style={modalFooter}>
            <TouchableOpacity onPress={() => {
              resetSortFields();
              filterBirds(search);
              close();
            }}>
              <Text style={{ ...modalFooterTextStyle, color: '#9b9b9b'}}>Сбросить</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              filterBirds(search, sort);
              close();
            }}>
              <Text style={{ ...modalFooterTextStyle, color: '#b49944'}}>Применить</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = {
  modalOverlayStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalContainerStyle: {
    width: '80%',
    height: 400,
    backgroundColor: '#fff',
    position: 'relative',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginTop: '20%',
    paddingTop: 17,
    paddingLeft: 24,
    paddingRight: 24
  },
  modalTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c2c'
  },
  radioGroupStyle: {
    marginTop: 20
  },
  radioGroupTitleStyle: {
    color: '#2c2c2c',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 17
  },
  radioOptionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17
  },
  radioButtonStyle: {
    color: '#9b9b9b',
    lineHeight: 22
  },
  modalFooter: {
    backgroundColor: '#1d1d1d',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '80%',
    alignSelf: 'center',
    marginTop: -40,
    paddingBottom: 11,
    paddingTop: 11,
    paddingRight: 15
  },
  modalFooterTextStyle: {
    fontSize: 14,
    letterSpacing: 0.5,
    marginLeft: 16
  }
}

export { SortModal };