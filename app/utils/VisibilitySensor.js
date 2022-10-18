import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions } from "react-native";

const VisibilitySensor = (props) => {
  const myView = useRef(null);
  const [lastValue, setLastValue] = useState(false);
  const [dimensions, setDimensions] = useState({
    rectTop: 0,
    rectBottom: 0,
    rectWidth: 0,
  });

  let interval = null;

  useEffect(() => {
    setLastValue(false);
    startWatching();
    isInViewPort();
    return stopWatching;
  }, [dimensions.rectTop, dimensions.rectBottom, dimensions.rectWidth]);

  const startWatching = () => {
    if (interval) {
      return;
    }

    interval = setInterval(() => {
      if (!myView || !myView.current) {
        return;
      }

      myView.current.measure(async (_x, _y, width, height, pageX, pageY) => {
        setDimensions({
          rectTop: pageY,
          rectBottom: pageY + height,
          rectWidth: pageX + width,
        });
      });
    }, 1000);
  };

  const stopWatching = () => {
    interval = clearInterval(interval);
  };

  const isInViewPort = () => {
    const window = Dimensions.get("window");
    const window50 = window.width * 0.5; // 50% of window
    const window90 = window.width * 0.9; // 50% of window

    const isVisible =
      dimensions.rectBottom != 0 &&
      dimensions.rectTop >= 0 &&
      dimensions.rectBottom <= window.height &&
      dimensions.rectWidth > 0 &&
      dimensions.rectWidth <= window.width + window50 && //! only visible if 90% of view is visible (fixes swipe right)
      dimensions.rectWidth >= window.width - window50; //! only visible if 50% of view is visible (fixes swipe left bug)
    if (lastValue !== isVisible) {
      setLastValue(isVisible);
      props.onChange(isVisible);
    } else {
      props.onChange(isVisible);
    }
  };
  return (
    <View collapsable={false} ref={myView} {...props}>
      {props.children}
      <View />
    </View>
  );
};

export default VisibilitySensor;
