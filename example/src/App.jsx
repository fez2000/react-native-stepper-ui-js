import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Stepper from 'react-native-stepper-ui';
import PropTypes from 'prop-types';

const MyComponent = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};
MyComponent.prototype = {
  "title": PropTypes.string,
}
const content = [
  <MyComponent title="Component 1" />,
  <MyComponent title="Component 2" />,
  <MyComponent title="Component 3" />,
];

const App = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={{ marginVertical: 80, marginHorizontal: 20 }}>
      <Stepper
        active={active}
        content={content}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() => Alert.alert('Finish')}
        onNext={() => setActive((p) => p + 1)}
      />
    </View>
  );
};

export default App;
