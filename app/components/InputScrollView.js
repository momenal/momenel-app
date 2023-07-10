// https://github.com/baijunjie/react-native-input-scroll-view (MIT License)

import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Animated,
  UIManager,
} from "react-native";

const isIOS = Platform.OS === "ios";

let debounce;

if (isIOS) {
  debounce = function (func, wait) {
    wait = wait || 0;
    let id, count;
    let action = function (event) {
      if (count) {
        count--;
        id = requestAnimationFrame(() => action.call(this, event));
      } else {
        func.call(this, event);
      }
    };
    return function (event) {
      event.persist();
      cancelAnimationFrame(id);
      count = wait;
      action.call(this, event);
    };
  };
} else {
  debounce = function (func, wait) {
    wait = wait || 0;
    let id, count;
    let action = function (event) {
      if (count) {
        count--;
        id = setTimeout(() => action.call(this, event));
      } else {
        func.call(this, event);
      }
    };
    return function (event) {
      event.persist();
      clearTimeout(id);
      count = wait;
      action.call(this, event);
    };
  };
}

export default class extends PureComponent {
  static defaultProps = {
    topOffset: 0,
    keyboardOffset: 40,
    multilineInputStyle: null,
    useAnimatedScrollView: false,
    keyboardAvoidingViewProps: null,
  };

  state = {
    measureInputVisible: false,
    measureInputValue: "",
    measureInputWidth: 0,
  };

  constructor(props) {
    super(props);

    this._root = null;
    this._curFocus = null;
    this._measureCallback = null;
    this._keyboardShow = false;
    this._inputInfoMap = {};
    this._topOffset = this.props.topOffset;

    this._addListener();
    this._extendScrollViewFunc();
  }

  componentWillUnmount() {
    this._removeListener();
  }

  render() {
    const {
      topOffset,
      keyboardOffset,
      multilineInputStyle,
      useAnimatedScrollView,
      supportHardwareKeyboard,
      keyboardAvoidingViewProps,
      children,
      ...otherProps
    } = this.props;

    const kavProps = Object.assign(
      { behavior: isIOS ? "padding" : "height" },
      keyboardAvoidingViewProps
    );

    const { measureInputVisible, measureInputValue, measureInputWidth } =
      this.state;

    const newChildren = this._cloneDeepComponents(children);

    const ScrollComponent = useAnimatedScrollView
      ? Animated.ScrollView
      : ScrollView;

    return (
      <KeyboardAvoidingView {...kavProps}>
        <View
          style={
            this.props.height ? { height: this.props.height } : styles.wrap
          }
        >
          <ScrollComponent
            ref={this._onRef}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            {...otherProps}
            keyboardShouldPersistTaps="handled"
          >
            <View
              onStartShouldSetResponderCapture={
                isIOS ? this._onTouchStart : null
              }
            >
              {newChildren}
              <View style={styles.hidden} pointerEvents="none">
                {measureInputVisible && (
                  <TextInput
                    style={[multilineInputStyle, { width: measureInputWidth }]}
                    value={measureInputValue}
                    onContentSizeChange={this._onContentSizeChangeMeasureInput}
                    editable={false}
                    multiline
                  />
                )}
              </View>
            </View>
          </ScrollComponent>
        </View>
      </KeyboardAvoidingView>
    );
  }

  _addListener() {
    this._keyboardShowListener = Keyboard.addListener(
      isIOS ? "keyboardWillShow" : "keyboardDidShow",
      this._onKeyboardShow
    );
    this._keyboardHideListener = Keyboard.addListener(
      isIOS ? "keyboardWillHide" : "keyboardDidHide",
      this._onKeyboardHide
    );
  }

  _removeListener() {
    this._keyboardShowListener && this._keyboardShowListener.remove();
    this._keyboardHideListener && this._keyboardHideListener.remove();
    this._keyboardShowListener = null;
    this._keyboardHideListener = null;
  }

  _extendScrollViewFunc() {
    const funcArray = ["scrollTo", "scrollToEnd"];

    funcArray.forEach((funcName) => {
      this[funcName] = (...args) => {
        this._root[funcName](...args);
      };
    });
  }

  _cloneDeepComponents(Component) {
    if (Component instanceof Array) {
      return Component.map((subComponent) =>
        this._cloneDeepComponents(subComponent)
      );
    } else if (Component && Component.props && Component.props.children) {
      const newComponent = { ...Component };
      newComponent.props = { ...Component.props };
      newComponent.props.children = this._cloneDeepComponents(
        Component.props.children
      );
      return newComponent;
    } else if (Component && Component.props && Component.props.multiline) {
      const newComponent = { ...Component };
      newComponent.props = { ...Component.props };
      return this._addMultilineHandle(newComponent);
    } else {
      return Component;
    }
  }

  _addMultilineHandle(Component) {
    const onChange = Component.props.onChange;
    const onSelectionChange = Component.props.onSelectionChange;
    const onContentSizeChange = Component.props.onContentSizeChange;

    Component.props.onChange = (event) => {
      this._onChange(event);
      onChange && onChange(event);
    };

    Component.props.onSelectionChange = (event) => {
      event.persist();
      if (isIOS) {
        requestAnimationFrame(() => this._onSelectionChange(event));
      } else {
        setTimeout(() => this._onSelectionChange(event));
      }
      onSelectionChange && onSelectionChange(event);
    };

    /**
     * 使用防抖函数有两个目的
     * - 确保 scrollToKeyboardRequest 在 onSelectionChange 之后执行
     * - 短时间内不会重复执行 onContentSizeChange，因为当一次粘贴进许多行文本时，可能会连续触发多次 onContentSizeChange
     */
    Component.props.onContentSizeChange = debounce((event) => {
      this._onContentSizeChange(event);
      onContentSizeChange && onContentSizeChange(event);
    }, 2);

    return Component;
  }

  _getInputInfo(target) {
    return (this._inputInfoMap[target] = this._inputInfoMap[target] || {});
  }

  _measureCursorPosition(text, width, callback) {
    this._measureCallback = callback;
    this.setState({
      measureInputVisible: true,
      measureInputValue: text,
      measureInputWidth: width,
    });
  }

  /**
   * 这里必须使用防抖函数
   * 因为在真机上，当行数增多时，每调整一次 measureInputValue 的值，onContentSizeChange 都会触发多次。
   * 如果不使用防抖函数，那么在 onContentSizeChange 第一次触发时，measureInputVisible 就会被设置为 false，导致无法获取正确的值。
   * 但在模拟器上没有这个问题。
   */
  _onContentSizeChangeMeasureInput = debounce((event) => {
    if (!this._measureCallback) return;
    this._measureCallback(event.nativeEvent.contentSize.height);
    this._measureCallback = null;
    this.setState({ measureInputVisible: false });
  }, 3);

  _onRef = (root) => {
    const { useAnimatedScrollView } = this.props;
    if (!root) return;
    this._root = root;

    if (useAnimatedScrollView && this._root._component) {
      this._root = this._root._component;
    }

    const getTopOffset = () => {
      this.props.topOffset === undefined &&
        this._root._innerViewRef &&
        this._root._innerViewRef.measureInWindow((x, y) => {
          if (y > 0) this._topOffset = y;
        });
    };

    setTimeout(getTopOffset);
  };

  _scrollToKeyboardRequest = () => {
    if (!this._keyboardShow && !this.props.supportHardwareKeyboard) return;

    const curFocusTarget = this._curFocus;
    if (!curFocusTarget) return;

    const scrollResponder = this._root && this._root.getScrollResponder();
    if (!scrollResponder) return;

    UIManager.viewIsDescendantOf(
      curFocusTarget,
      scrollResponder.getInnerViewNode(),
      (isAncestor) => {
        if (!isAncestor) return;

        const { text, selectionEnd, width, height } =
          this._getInputInfo(curFocusTarget);
        const cursorAtLastLine =
          !text || selectionEnd === undefined || text.length === selectionEnd;

        if (cursorAtLastLine) {
          return this._scrollToKeyboard(curFocusTarget, 0);
        }

        this._measureCursorPosition(
          text.substr(0, selectionEnd),
          width,
          (cursorRelativeTopOffset) => {
            this._scrollToKeyboard(
              curFocusTarget,
              Math.max(0, height - cursorRelativeTopOffset)
            );
          }
        );
      }
    );
  };

  _scrollToKeyboard = (target, offset) => {
    const toKeyboardOffset =
      this._topOffset + this.props.keyboardOffset - offset;
    this._root.scrollResponderScrollNativeHandleToKeyboard(
      target,
      toKeyboardOffset,
      false
    ); // false to support multiline scroll when a new is entered
  };

  _onKeyboardShow = () => {
    if (this._keyboardShow) return;
    this._keyboardShow = true;
    this._scrollToKeyboardRequest();
  };

  _onKeyboardHide = () => {
    this._keyboardShow = false;
  };

  /**
   * 这个方法是为了防止 ScrollView 在滑动结束后触发 TextInput 的 focus 事件
   */
  _onTouchStart = (event) => {
    const target = getTarget(event);
    if (target === this._curFocus) return false;

    const targetInst = event._targetInst;
    const uiViewClassName =
      targetInst.type || // >= react-native 0.49
      targetInst.viewConfig.uiViewClassName; // <= react-native 0.48
    return (
      uiViewClassName === "RCTTextField" ||
      uiViewClassName === "RCTTextView" ||
      uiViewClassName === "RCTMultilineTextInputView"
    );
  };

  /**
   * 在单行 TextInput 中
   * onFocus 在 keyboardWillShow 与 keyboardDidShow 之前触发
   * 在多行 TextInput 中
   * onFocus 在 keyboardDidShow 之前触发
   * onFocus 在 keyboardWillShow 之后触发
   */
  _onFocus = (event) => {
    const target = getTarget(event);
    this._curFocus = target;

    const inputInfo = this._getInputInfo(target);
    const multiline = getProps(event._targetInst).multiline;

    if (multiline) {
      if (inputInfo.text === undefined) {
        const props = getProps(event._targetInst);
        inputInfo.text = props.value || props.defaultValue;
      }

      if (!isIOS) return;

      inputInfo.onFocusRequireScroll = true;
      setTimeout(() => {
        if (
          (this._keyboardShow || this.props.supportHardwareKeyboard) &&
          inputInfo.onFocusRequireScroll
        ) {
          inputInfo.onFocusRequireScroll = false;
          this._scrollToKeyboardRequest();
        }
      }, 250);
    } else {
      if (isIOS) this._scrollToKeyboardRequest();
    }
  };

  _onBlur = (event) => {
    const target = getTarget(event);
    if (this._curFocus === target) this._curFocus = null;
  };

  _onChange = (event) => {
    if (!event.nativeEvent) return;
    const target = getTarget(event);
    const inputInfo = this._getInputInfo(target);
    inputInfo.text = event.nativeEvent.text;
  };

  _onSelectionChange = debounce((event) => {
    const target = getTarget(event);
    const inputInfo = this._getInputInfo(target);

    inputInfo.selectionEnd = event.nativeEvent.selection.end;

    if (inputInfo.text === undefined) {
      inputInfo.text = getProps(event._targetInst).value;
    }

    if (!isIOS) return;

    if (inputInfo.onFocusRequireScroll) {
      inputInfo.onFocusRequireScroll = false;
      this._scrollToKeyboardRequest();
    }
  }, 1);

  _onContentSizeChange = (event) => {
    if (!event.nativeEvent) return;
    const target = getTarget(event);
    const inputInfo = this._getInputInfo(target);
    inputInfo.width = event.nativeEvent.contentSize.width;
    inputInfo.height = event.nativeEvent.contentSize.height;
    if (inputInfo.text === undefined) {
      inputInfo.text = getProps(event._targetInst).value;
    }
    this._scrollToKeyboardRequest(true);
  };
}

function focus(targetTag) {
  if (isIOS) {
    UIManager.focus(targetTag);

    TextInput.State && TextInput.State.focusTextInput(targetTag);
  } else {
    const AndroidTextInput =
      (UIManager.getViewManagerConfig &&
        UIManager.getViewManagerConfig("AndroidTextInput")) ||
      UIManager.AndroidTextInput;
    UIManager.dispatchViewManagerCommand(
      targetTag,
      AndroidTextInput.Commands.focusTextInput,
      null
    );
  }
}

function getTarget(event) {
  return (
    event.nativeEvent.target || // on >= 0.63 target tag can be found on nativeEvent not sure in other versions
    event.target ||
    event.currentTarget ||
    event._targetInst.stateNode._nativeTag
  ); // for Android
}

function getProps(targetNode) {
  return (
    targetNode.memoizedProps || // >= react-native 0.49
    targetNode._currentElement.props
  ); // <= react-native 0.48
}

const styles = StyleSheet.create({
  wrap: {
    height: "100%",
  },
  hidden: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
  },
});
