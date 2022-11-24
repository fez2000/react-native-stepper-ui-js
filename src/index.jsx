import React, {  useState, ReactElement, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
const I18N = {
  'back': 'Back',
  'next': 'Next',
  'finish': 'Finish'
}
const ICONS = {
  "PENDING":"?",
  "SUCCESS": "&#10003", 
}

const search = (keyName, myArray) => {
  return myArray.some((val) => val === keyName);
};

const Stepper = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
   
    onFinish,
    wrapperStyle,
    stepLine,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
    pendingState = true,
    stepsIcons = {}
  } = props;
 let  icons  = props.icons || ICONS;
  let i18n  = props.i18n || I18N;
  const [step, setStep] = useState([0]);
  const pushData = (val) => {
    setStep((prev) => [...prev, val]);
  };

  const removeData = () => {
    setStep((prev) => {
      prev.pop();
      return prev;
    });
  };

  useEffect(() => {
    if (step[step.length - 1] > active) {
      removeData();
    } else {
      pushData(active);
    }
  }, [active]);

  return (
    <View style={wrapperStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={[{
                    flex: 1,
                    height: 1,
                    backgroundColor: 'grey',
                    opacity: 1,
                    marginHorizontal: 10,
                  },stepLine]}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: '#1976d2',
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: search(i, step) ? 1 : 0.3,
                  },
                  stepStyle,
                ]}
              >
                {search(i, step) ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}
                  >
                   { pendingState ? (active == i? icons["PENDING"]: icons["SUCCESS"]) : (stepsIcons[i + 1] || i + 1)}
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}
                  >
                    {stepsIcons[i + 1] || i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {content[active]}
      </ScrollView>
      {showButton && (
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {active !== 0 && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
                {
                  backgroundColor: '#a1a1a1',
                },
              ]}
              onPress={() => {
                // removeData();
                onBack();
              }}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>{i18n?.back }</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
              ]}
              onPress={() => {
                // pushData(active + 1);
                onNext();
              }}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>{i18n?.next }</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                },
                buttonStyle,
              ]}
              onPress={() => onFinish()}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>{i18n?.finish }</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
Stepper.prototype = {
  active: PropTypes.number.isRequired,
  content: PropTypes.arrayOf(ReactElement),
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  i18n: PropTypes.object,
  icons: PropTypes.object,
  wrapperStyle: PropTypes.instanceOf(ViewStyle),
  stepStyle: PropTypes.instanceOf(ViewStyle),
  stepLine: PropTypes.instanceOf(ViewStyle),
  stepTextStyle: PropTypes.instanceOf(TextStyle),
  buttonStyle: PropTypes.instanceOf(ViewStyle),
  buttonTextStyle: PropTypes.instanceOf(TextStyle),
  showButton: PropTypes.bool,
  pendingState: PropTypes.bool,
  stepsIcons: PropTypes.object
}

export default Stepper;
